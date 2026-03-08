from decimal import Decimal

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session, joinedload

from app.db import get_db
from app.models import Customer, Order, Product, StoreSettings
from app.security import require_admin_user
from app.schemas import CustomerRead, DashboardStats, OrderAdminRead, StoreSettingsRead, StoreSettingsUpdate

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/customers", response_model=list[CustomerRead])
def list_customers(db: Session = Depends(get_db), _: object = Depends(require_admin_user)) -> list[CustomerRead]:
    customers = list(
        db.scalars(
            select(Customer)
            .options(joinedload(Customer.orders))
            .order_by(Customer.id.desc())
        ).unique().all()
    )

    result: list[CustomerRead] = []
    for customer in customers:
        total_spent = sum((Decimal(order.total_amount) for order in customer.orders), Decimal("0.00"))
        result.append(
            CustomerRead(
                id=customer.id,
                email=customer.email,
                full_name=customer.full_name,
                created_at=customer.created_at,
                orders_count=len(customer.orders),
                total_spent=total_spent,
            )
        )
    return result


@router.get("/dashboard", response_model=DashboardStats)
def dashboard_stats(db: Session = Depends(get_db), _: object = Depends(require_admin_user)) -> DashboardStats:
    total_revenue = db.scalar(select(func.coalesce(func.sum(Order.total_amount), 0)))
    total_orders = db.scalar(select(func.count(Order.id))) or 0
    total_customers = db.scalar(select(func.count(Customer.id))) or 0
    low_stock_products = db.scalar(select(func.count(Product.id)).where(Product.stock <= 5, Product.is_active.is_(True))) or 0

    recent_orders = list(
        db.scalars(
            select(Order)
            .options(joinedload(Order.items), joinedload(Order.customer))
            .order_by(Order.id.desc())
            .limit(8)
        ).unique().all()
    )
    mapped_recent = [
        OrderAdminRead(
            id=order.id,
            status=order.status,
            total_amount=order.total_amount,
            created_at=order.created_at,
            customer_id=order.customer_id,
            customer_email=order.customer.email,
            customer_name=order.customer.full_name,
            items_count=len(order.items),
        )
        for order in recent_orders
    ]

    return DashboardStats(
        total_revenue=Decimal(total_revenue or 0),
        total_orders=total_orders,
        total_customers=total_customers,
        low_stock_products=low_stock_products,
        recent_orders=mapped_recent,
    )


@router.get("/settings", response_model=StoreSettingsRead)
def get_settings(db: Session = Depends(get_db), _: object = Depends(require_admin_user)) -> StoreSettings:
    settings = db.get(StoreSettings, 1)
    if settings is None:
        settings = StoreSettings(id=1)
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


@router.put("/settings", response_model=StoreSettingsRead)
def update_settings(
    payload: StoreSettingsUpdate,
    db: Session = Depends(get_db),
    _: object = Depends(require_admin_user),
) -> StoreSettings:
    settings = db.get(StoreSettings, 1)
    if settings is None:
        settings = StoreSettings(id=1)

    updates = payload.model_dump()
    for field, value in updates.items():
        setattr(settings, field, value)

    db.add(settings)
    db.commit()
    db.refresh(settings)
    return settings
