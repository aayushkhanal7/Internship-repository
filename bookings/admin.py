from django.contrib import admin

from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "vehicle",
        "start_date",
        "end_date",
        "total_price",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "start_date",
        "end_date",
    )

    search_fields = (
        "user__email",
        "vehicle__name",
    )

    readonly_fields = (
        "total_price",
        "created_at",
        "updated_at",
    )