from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.db import get_db
from app.models import Customer, Order, OrderItem, Product
from app.security import require_admin_user
from app.schemas import OrderAdminRead, OrderCreate, OrderRead, OrderStatusUpdate

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)) -> Order:
    customer = db.scalar(select(Customer).where(Customer.email == payload.customer_email))
    if customer is None:
        customer = Customer(email=payload.customer_email, full_name=payload.customer_name)
        db.add(customer)
        db.flush()
    elif payload.customer_name and customer.full_name != payload.customer_name:
        customer.full_name = payload.customer_name
        db.add(customer)

    order = Order(customer_id=customer.id, status="pending", total_amount=Decimal("0.00"))
    db.add(order)
    db.flush()

    total = Decimal("0.00")
    for item in payload.items:
        product = db.get(Product, item.product_id)
        if product is None or not product.is_active:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Produit indisponible: {item.product_id}",
            )
        if product.stock < item.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Stock insuffisant pour le produit {product.id}.",
            )

        product.stock -= item.quantity
        line_total = Decimal(product.price) * item.quantity
        total += line_total

        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=item.quantity,
            unit_price=product.price,
        )
        db.add(order_item)
        db.add(product)

    order.total_amount = total
    db.add(order)
    db.commit()

    order_with_items = db.execute(
        select(Order)
        .options(joinedload(Order.items))
        .where(Order.id == order.id)
    ).unique().scalar_one_or_none()
    if order_with_items is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Commande non récupérée.")
    return order_with_items


@router.get("/{order_id}", response_model=OrderRead)
def get_order(order_id: int, db: Session = Depends(get_db)) -> Order:
    order = db.execute(
        select(Order)
        .options(joinedload(Order.items))
        .where(Order.id == order_id)
    ).unique().scalar_one_or_none()
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Commande introuvable.")
    return order


@router.get("", response_model=list[OrderAdminRead])
def list_orders(
    status_filter: str | None = Query(default=None),
    limit: int = Query(default=100, ge=1, le=500),
    db: Session = Depends(get_db),
    _: object = Depends(require_admin_user),
) -> list[OrderAdminRead]:
    stmt = (
        select(Order)
        .options(joinedload(Order.items), joinedload(Order.customer))
        .order_by(Order.id.desc())
        .limit(limit)
    )
    if status_filter:
        stmt = stmt.where(Order.status == status_filter)

    orders = list(db.scalars(stmt).unique().all())
    return [
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
        for order in orders
    ]


@router.patch("/{order_id}/status", response_model=OrderAdminRead)
def update_order_status(
    order_id: int,
    payload: OrderStatusUpdate,
    db: Session = Depends(get_db),
    _: object = Depends(require_admin_user),
) -> OrderAdminRead:
    order = db.execute(
        select(Order)
        .options(joinedload(Order.items), joinedload(Order.customer))
        .where(Order.id == order_id)
    ).unique().scalar_one_or_none()
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Commande introuvable.")

    order.status = payload.status
    db.add(order)
    db.commit()
    db.refresh(order)

    return OrderAdminRead(
        id=order.id,
        status=order.status,
        total_amount=order.total_amount,
        created_at=order.created_at,
        customer_id=order.customer_id,
        customer_email=order.customer.email,
        customer_name=order.customer.full_name,
        items_count=len(order.items),
    )
