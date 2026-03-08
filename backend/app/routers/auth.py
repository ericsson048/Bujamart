from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db import get_db
from app.email_service import send_password_reset_email, send_welcome_email
from app.models import PasswordResetToken, RefreshToken, User
from app.rate_limit import check_rate_limit
from app.security import (
    create_access_token,
    decode_token,
    generate_refresh_token,
    get_current_user,
    hash_password,
    hash_token,
    now_utc,
    verify_password,
)
from app.schemas import (
    AuthLogin,
    AuthRegister,
    AuthResponse,
    ChangePasswordRequest,
    ForgotPasswordRequest,
    LogoutRequest,
    RefreshTokenRequest,
    ResetPasswordRequest,
)

router = APIRouter(prefix="/auth", tags=["auth"])


def resolve_role(is_admin: bool) -> str:
    return "admin" if is_admin else "client"


def build_auth_response(user: User, access_token: str | None = None, refresh_token: str | None = None) -> AuthResponse:
    return AuthResponse(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        is_admin=user.is_admin,
        role=resolve_role(user.is_admin),
        access_token=access_token,
        token_type="bearer" if access_token else None,
        refresh_token=refresh_token,
    )


def issue_refresh_token(user: User, db: Session) -> str:
    token = generate_refresh_token()
    expires_at = now_utc() + timedelta(days=settings.refresh_token_expire_days)
    db.add(
        RefreshToken(
            user_id=user.id,
            token_hash=hash_token(token),
            expires_at=expires_at,
        )
    )
    db.commit()
    return token


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: AuthRegister, db: Session = Depends(get_db)) -> AuthResponse:
    existing = db.scalar(select(User).where(User.email == payload.email))
    if existing is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email déjà utilisé.")

    user = User(
        full_name=payload.full_name,
        email=payload.email,
        password_hash=hash_password(payload.password),
        is_admin=False,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    access_token = create_access_token(user)
    refresh_token = issue_refresh_token(user, db)
    send_welcome_email(user.email, user.full_name)

    return build_auth_response(user, access_token=access_token, refresh_token=refresh_token)


@router.post("/login", response_model=AuthResponse)
def login(payload: AuthLogin, request: Request, db: Session = Depends(get_db)) -> AuthResponse:
    ip = request.client.host if request.client else "unknown"
    limit_key = f"login:{ip}:{payload.email.lower()}"
    if not check_rate_limit(limit_key, max_attempts=8, window_seconds=60):
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Trop de tentatives. Réessayez bientôt.")

    user = db.scalar(select(User).where(User.email == payload.email))
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Identifiants invalides.")

    if not user.password_hash.startswith("pbkdf2_sha256$"):
        user.password_hash = hash_password(payload.password)
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = create_access_token(user)
    refresh_token = issue_refresh_token(user, db)
    return build_auth_response(user, access_token=access_token, refresh_token=refresh_token)


@router.post("/refresh", response_model=AuthResponse)
def refresh(payload: RefreshTokenRequest, db: Session = Depends(get_db)) -> AuthResponse:
    token_hash = hash_token(payload.refresh_token)
    stored = db.scalar(select(RefreshToken).where(RefreshToken.token_hash == token_hash))
    if stored is None or stored.revoked_at is not None or stored.expires_at <= now_utc():
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token invalide.")

    user = db.get(User, stored.user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Utilisateur introuvable.")

    stored.revoked_at = now_utc()
    db.add(stored)
    db.commit()

    access_token = create_access_token(user)
    refresh_token = issue_refresh_token(user, db)
    return build_auth_response(user, access_token=access_token, refresh_token=refresh_token)


@router.post("/logout")
def logout(payload: LogoutRequest, db: Session = Depends(get_db)) -> dict[str, str]:
    token_hash = hash_token(payload.refresh_token)
    stored = db.scalar(select(RefreshToken).where(RefreshToken.token_hash == token_hash))
    if stored is not None and stored.revoked_at is None:
        stored.revoked_at = now_utc()
        db.add(stored)
        db.commit()
    return {"status": "ok"}


@router.get("/me", response_model=AuthResponse)
def me(current_user: User = Depends(get_current_user)) -> AuthResponse:
    return build_auth_response(current_user)


@router.post("/change-password")
def change_password(
    payload: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    if not verify_password(payload.current_password, current_user.password_hash):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Mot de passe actuel incorrect.")

    current_user.password_hash = hash_password(payload.new_password)
    db.add(current_user)
    db.commit()
    return {"status": "ok"}


@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)) -> dict[str, str]:
    user = db.scalar(select(User).where(User.email == payload.email))
    if user is None:
        return {"status": "ok"}

    raw_token = generate_refresh_token()
    token_hash = hash_token(raw_token)
    expires_at = now_utc() + timedelta(minutes=30)
    db.add(
        PasswordResetToken(
            user_id=user.id,
            token_hash=token_hash,
            expires_at=expires_at,
        )
    )
    db.commit()

    reset_link = f"{settings.frontend_url}/reset-password?token={raw_token}"
    send_password_reset_email(user.email, reset_link)
    return {"status": "ok"}


@router.post("/reset-password")
def reset_password(payload: ResetPasswordRequest, db: Session = Depends(get_db)) -> dict[str, str]:
    token_hash = hash_token(payload.token)
    reset = db.scalar(select(PasswordResetToken).where(PasswordResetToken.token_hash == token_hash))
    if reset is None or reset.used_at is not None or reset.expires_at <= now_utc():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Token invalide ou expiré.")

    user = db.get(User, reset.user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Utilisateur introuvable.")

    user.password_hash = hash_password(payload.new_password)
    reset.used_at = now_utc()
    db.add(user)
    db.add(reset)
    db.commit()
    return {"status": "ok"}
