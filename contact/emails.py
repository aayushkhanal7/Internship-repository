from django.core.mail import send_mail
from django.conf import settings


def send_contact_message_email(contact_message):
    send_mail(
        subject="New Contact Form Message",
        message=(
            f"Name: {contact_message.name}\n"
            f"Email: {contact_message.email}\n"
            f"Subject: {contact_message.subject}\n\n"
            f"Message:\n{contact_message.message}"
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.DEFAULT_FROM_EMAIL],
        fail_silently=False,
    )