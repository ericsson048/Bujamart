import os
from dataclasses import dataclass


def _load_env_file(path: str = '.env') -> None:
    if not os.path.exists(path):
        return
    with open(path, encoding='utf-8') as env_file:
        for line in env_file:
            cleaned = line.strip()
            if not cleaned or cleaned.startswith('#') or '=' not in cleaned:
                continue
            key, value = cleaned.split('=', 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def _to_bool(value: str | None, default: bool) -> bool:
    if value is None:
        return default
    return value.strip().lower() in {'1', 'true', 'yes', 'on'}


_load_env_file()


@dataclass(frozen=True)
class Settings:
    database_url: str = os.getenv('DATABASE_URL', 'postgresql+psycopg://postgres:postgres@localhost:5432/bujamart')
    api_host: str = os.getenv('API_HOST', '0.0.0.0')
    api_port: int = int(os.getenv('API_PORT', '8000'))
    api_reload: bool = _to_bool(os.getenv('API_RELOAD'), True)
    cors_origins: str = os.getenv('CORS_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000')
    admin_email: str = os.getenv('ADMIN_EMAIL', 'admin@bujamart.bi')
    admin_password: str = os.getenv('ADMIN_PASSWORD', 'admin123')
    admin_full_name: str = os.getenv('ADMIN_FULL_NAME', 'Admin Bujamart')
    secret_key: str = os.getenv('SECRET_KEY', 'change-me-in-production')
    jwt_algorithm: str = os.getenv('JWT_ALGORITHM', 'HS256')
    access_token_expire_minutes: int = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', '120'))
    refresh_token_expire_days: int = int(os.getenv('REFRESH_TOKEN_EXPIRE_DAYS', '15'))
    stripe_publishable_key: str = os.getenv('STRIPE_PUBLISHABLE_KEY', '')
    stripe_secret_key: str = os.getenv('STRIPE_SECRET_KEY', '')
    stripe_webhook_secret: str = os.getenv('STRIPE_WEBHOOK_SECRET', '')
    email_host: str = os.getenv('EMAIL_HOST', '')
    email_port: int = int(os.getenv('EMAIL_PORT', '587'))
    email_host_user: str = os.getenv('EMAIL_HOST_USER', '')
    email_host_password: str = os.getenv('EMAIL_HOST_PASSWORD', '')
    email_use_tls: bool = _to_bool(os.getenv('EMAIL_USE_TLS'), True)
    default_from_email: str = os.getenv('DEFAULT_FROM_EMAIL', '')
    frontend_url: str = os.getenv('FRONTEND_URL', 'http://localhost:3000')


settings = Settings()
