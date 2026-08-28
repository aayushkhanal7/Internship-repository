from django.conf import settings
from django.db import models


class Vehicle(models.Model):

    VEHICLE_TYPE_CHOICES = [
        ("2W", "Two Wheeler"),
        ("3W", "Three Wheeler"),
        ("4W", "Four Wheeler"),
    ]

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="vehicles"
    )

    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)

    vehicle_type = models.CharField(
        max_length=2,
        choices=VEHICLE_TYPE_CHOICES
    )

    description = models.TextField()

    price_per_day = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    location = models.CharField(max_length=100)

    is_available = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.brand} {self.name}"