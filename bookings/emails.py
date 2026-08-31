from django.core.mail import send_mail
from django.conf import settings


def send_booking_created_email(booking):
    send_mail(
        subject="Booking Request Created",
        message=(
            f"Hello {booking.user.email},\n\n"
            f"Your booking request for {booking.vehicle.name} has been created.\n\n"
            f"Start date: {booking.start_date}\n"
            f"End date: {booking.end_date}\n"
            f"Total price: NPR {booking.total_price}\n"
            f"Status: {booking.status}\n\n"
            "Thank you for using the Vehicle Rental Platform."
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[booking.user.email],
        fail_silently=False,
    )


def send_booking_confirmed_email(booking):
    send_mail(
        subject="Booking Confirmed",
        message=(
            f"Hello {booking.user.email},\n\n"
            f"Your booking for {booking.vehicle.name} has been confirmed.\n\n"
            f"Start date: {booking.start_date}\n"
            f"End date: {booking.end_date}\n"
            f"Total price: NPR {booking.total_price}\n"
            f"Status: {booking.status}\n\n"
            "Thank you for using the Vehicle Rental Platform."
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[booking.user.email],
        fail_silently=False,
    )


def send_booking_cancelled_email(booking):
    send_mail(
        subject="Booking Cancelled",
        message=(
            f"Hello {booking.user.email},\n\n"
            f"Your booking for {booking.vehicle.name} has been cancelled.\n\n"
            f"Start date: {booking.start_date}\n"
            f"End date: {booking.end_date}\n"
            f"Total price: NPR {booking.total_price}\n"
            f"Status: {booking.status}\n\n"
            "Thank you for using the Vehicle Rental Platform."
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[booking.user.email],
        fail_silently=False,
    )