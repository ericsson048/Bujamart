import smtplib
import logging
from email.message import EmailMessage

from app.core.config import settings

logger = logging.getLogger(__name__)


def _can_send() -> bool:
    return bool(settings.email_host and settings.email_host_user and settings.email_host_password and settings.default_from_email)


def send_email(to_email: str, subject: str, body: str) -> None:
    if not _can_send():
        return

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = settings.default_from_email
    message["To"] = to_email
    message.set_content(body)

    try:
        with smtplib.SMTP(settings.email_host, settings.email_port, timeout=30) as smtp:
            if settings.email_use_tls:
                smtp.starttls()
            smtp.login(settings.email_host_user, settings.email_host_password)
            smtp.send_message(message)
    except Exception as exc:
        # Emails are non-critical for core API flows (register/checkout); log and continue.
        logger.warning("Email delivery failed for %s: %s", to_email, exc)


def send_welcome_email(to_email: str, full_name: str) -> None:
    send_email(
        to_email=to_email,
        subject="Bienvenue sur Bujamart",
        body=f"Bonjour {full_name},\n\nVotre compte Bujamart est maintenant actif.",
    )


def send_password_reset_email(to_email: str, reset_link: str) -> None:
    send_email(
        to_email=to_email,
        subject="Réinitialisation de mot de passe",
        body=f"Pour réinitialiser votre mot de passe, utilisez ce lien:\n{reset_link}\n\nCe lien expire rapidement.",
    )


def send_order_confirmation_email(to_email: str, amount_text: str) -> None:
    send_email(
        to_email=to_email,
        subject="Confirmation de commande Bujamart",
        body=f"Votre commande a été confirmée. Montant payé: {amount_text}.",
    )
