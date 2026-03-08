from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ProductBase(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    description: str | None = None
    price: Decimal = Field(gt=0)
    stock: int = Field(ge=0, default=0)
    image_url: str | None = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=150)
    description: str | None = None
    price: Decimal | None = Field(default=None, gt=0)
    stock: int | None = Field(default=None, ge=0)
    image_url: str | None = None
    is_active: bool | None = None


class ProductRead(ProductBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)


class OrderCreate(BaseModel):
    customer_email: EmailStr
    customer_name: str | None = Field(default=None, max_length=150)
    items: list[OrderItemCreate] = Field(min_length=1)


class OrderItemRead(BaseModel):
    id: int
    product_id: int
    quantity: int
    unit_price: Decimal

    model_config = ConfigDict(from_attributes=True)


class OrderRead(BaseModel):
    id: int
    customer_id: int
    status: str
    payment_status: str
    payment_provider: str | None = None
    total_amount: Decimal
    created_at: datetime
    items: list[OrderItemRead]

    model_config = ConfigDict(from_attributes=True)


class OrderAdminRead(BaseModel):
    id: int
    status: str
    total_amount: Decimal
    created_at: datetime
    customer_id: int
    customer_email: EmailStr
    customer_name: str | None = None
    items_count: int


class OrderStatusUpdate(BaseModel):
    status: str = Field(min_length=2, max_length=40)


class CustomerRead(BaseModel):
    id: int
    email: EmailStr
    full_name: str | None = None
    created_at: datetime
    orders_count: int = 0
    total_spent: Decimal = Decimal("0.00")


class DashboardStats(BaseModel):
    total_revenue: Decimal
    total_orders: int
    total_customers: int
    low_stock_products: int
    recent_orders: list[OrderAdminRead]


class AuthRegister(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    password: str = Field(min_length=6, max_length=255)


class AuthLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=255)


class AuthResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    is_admin: bool
    role: Literal["admin", "client"]
    access_token: str | None = None
    token_type: str | None = None
    refresh_token: str | None = None


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class LogoutRequest(BaseModel):
    refresh_token: str


class ChangePasswordRequest(BaseModel):
    current_password: str = Field(min_length=6, max_length=255)
    new_password: str = Field(min_length=6, max_length=255)


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(min_length=6, max_length=255)


class PaymentCheckoutRequest(BaseModel):
    order_id: int
    success_url: str
    cancel_url: str


class PaymentCheckoutResponse(BaseModel):
    checkout_url: str
    session_id: str


class StoreSettingsRead(BaseModel):
    id: int
    store_name: str
    contact_email: EmailStr
    contact_phone: str
    address: str
    currency: str
    timezone: str
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class StoreSettingsUpdate(BaseModel):
    store_name: str = Field(min_length=2, max_length=150)
    contact_email: EmailStr
    contact_phone: str = Field(min_length=4, max_length=50)
    address: str = Field(min_length=4)
    currency: str = Field(min_length=2, max_length=10)
    timezone: str = Field(min_length=3, max_length=100)
