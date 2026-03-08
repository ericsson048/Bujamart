from fastapi import APIRouter, Depends, Header, HTTPException, Request, status
import stripe
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.core.config import settings
from app.db import get_db
from app.email_service import send_order_confirmation_email
from app.models import Order
from app.security import get_current_user
from app.schemas import PaymentCheckoutRequest, PaymentCheckoutResponse

router = APIRouter(prefix="/payments", tags=["payments"])

if settings.stripe_secret_key:
    stripe.api_key = settings.stripe_secret_key


@router.post("/checkout-session", response_model=PaymentCheckoutResponse)
def create_checkout_session(
    payload: PaymentCheckoutRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
) -> PaymentCheckoutResponse:
    if not settings.stripe_secret_key:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Stripe non configuré.")

    order = db.scalar(
        select(Order)
        .options(joinedload(Order.customer), joinedload(Order.items))
        .where(Order.id == payload.order_id)
    )
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Commande introuvable.")

    if not current_user.is_admin and order.customer.email.lower() != current_user.email.lower():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Commande non autorisée.")

    if order.payment_status == "paid":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Commande déjà payée.")

    session = stripe.checkout.Session.create(
        mode="payment",
        success_url=payload.success_url,
        cancel_url=payload.cancel_url,
        customer_email=order.customer.email,
        line_items=[
            {
                "price_data": {
                    "currency": "bif",
                    "product_data": {"name": f"Commande Bujamart #{order.id}"},
                    "unit_amount": int(float(order.total_amount) * 100),
                },
                "quantity": 1,
            }
        ],
        metadata={"order_id": str(order.id)},
    )

    order.payment_provider = "stripe"
    order.payment_reference = session.id
    order.payment_status = "processing"
    db.add(order)
    db.commit()

    return PaymentCheckoutResponse(checkout_url=session.url, session_id=session.id)


@router.post("/webhooks/stripe")
async def stripe_webhook(
    request: Request,
    stripe_signature: str | None = Header(default=None, alias="Stripe-Signature"),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    payload = await request.body()
    if not settings.stripe_webhook_secret:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Webhook Stripe non configuré.")
    if stripe_signature is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Signature manquante.")

    try:
        event = stripe.Webhook.construct_event(payload=payload, sig_header=stripe_signature, secret=settings.stripe_webhook_secret)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Webhook invalide.")

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        order_id = int(session.get("metadata", {}).get("order_id", "0"))
        order = db.scalar(select(Order).options(joinedload(Order.customer)).where(Order.id == order_id))
        if order is not None:
            order.payment_status = "paid"
            order.status = "processing"
            order.payment_provider = "stripe"
            order.payment_reference = session.get("id")
            db.add(order)
            db.commit()
            send_order_confirmation_email(order.customer.email, f"{order.total_amount} BIF")

    return {"status": "ok"}

