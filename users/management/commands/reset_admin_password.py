from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    help = "Temporarily reset the production admin password."

    def handle(self, *args, **options):
        email = "aaayushkhanal999@gmail.com"

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            self.stdout.write(
                self.style.ERROR(f"User not found: {email}")
            )
            return

        user.set_password("admin123")
        user.is_staff = True
        user.is_superuser = True
        user.save()

        self.stdout.write(
            self.style.SUCCESS(
                f"Admin password reset successfully for {email}"
            )
        )