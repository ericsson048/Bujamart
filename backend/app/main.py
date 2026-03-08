from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.config import settings
from app.db import Base, SessionLocal, engine
from app.models import Product, User
from app.routers.admin import router as admin_router
from app.routers.auth import router as auth_router
from app.routers.orders import router as orders_router
from app.routers.payments import router as payments_router
from app.routers.products import router as products_router
from app.security import hash_password

app = FastAPI(
    title="Bujamart API",
    version="1.0.0",
    description="Backend e-commerce FastAPI avec PostgreSQL.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    # For quick bootstrap. Prefer Alembic migrations in production.
    Base.metadata.create_all(bind=engine)
    apply_legacy_schema_updates()
    seed_products_if_empty()
    seed_admin_user_if_missing()


def apply_legacy_schema_updates() -> None:
    """Lightweight schema patching for existing databases without Alembic."""
    with engine.begin() as conn:
        conn.execute(
            text(
                """
                ALTER TABLE orders
                ADD COLUMN IF NOT EXISTS payment_status VARCHAR(40) NOT NULL DEFAULT 'unpaid'
                """
            )
        )
        conn.execute(
            text(
                """
                ALTER TABLE orders
                ADD COLUMN IF NOT EXISTS payment_provider VARCHAR(40)
                """
            )
        )
        conn.execute(
            text(
                """
                ALTER TABLE orders
                ADD COLUMN IF NOT EXISTS payment_reference VARCHAR(255)
                """
            )
        )


def seed_products_if_empty() -> None:
    db = SessionLocal()
    try:
        existing_products = db.query(Product).count()
        if existing_products > 0:
            return

        sample_products = [
            Product(name="Sac de riz 25kg", description="Riz premium local.", price=75000, stock=45, image_url=""),
            Product(name="Huile de palme 5L", description="Huile alimentaire raffinée.", price=30000, stock=12, image_url=""),
            Product(name="Panier Légumes Bio", description="Sélection hebdo de légumes frais.", price=15000, stock=20, image_url=""),
            Product(name="Bananes Douces (Régime)", description="Bananes fraîches de Gitega.", price=5500, stock=30, image_url=""),
        ]
        db.add_all(sample_products)
        db.commit()
    finally:
        db.close()


def seed_admin_user_if_missing() -> None:
    db = SessionLocal()
    try:
        admin = db.query(User).filter(User.email == settings.admin_email).first()
        if admin is not None:
            # Keep existing account but enforce admin role and hash format for bootstrap account.
            needs_update = False
            if not admin.is_admin:
                admin.is_admin = True
                needs_update = True
            if not admin.password_hash.startswith("pbkdf2_sha256$"):
                admin.password_hash = hash_password(settings.admin_password)
                needs_update = True
            if needs_update:
                db.add(admin)
                db.commit()
            return

        db.add(
            User(
                email=settings.admin_email,
                full_name=settings.admin_full_name,
                password_hash=hash_password(settings.admin_password),
                is_admin=True,
            )
        )
        db.commit()
    finally:
        db.close()


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(products_router, prefix="/api/v1")
app.include_router(orders_router, prefix="/api/v1")
app.include_router(admin_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")
app.include_router(payments_router, prefix="/api/v1")
