from rest_framework import serializers

from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(
        source="user.email",
        read_only=True,
    )

    vehicle_name = serializers.CharField(
        source="vehicle.name",
        read_only=True,
    )

    class Meta:
        model = Booking
        fields = (
            "id",
            "user",
            "user_email",
            "vehicle",
            "vehicle_name",
            "start_date",
            "end_date",
            "total_price",
            "status",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "user",
            "user_email",
            "vehicle_name",
            "total_price",
            "status",
            "created_at",
            "updated_at",
        )

    def validate(self, attrs):
        start_date = attrs.get("start_date")
        end_date = attrs.get("end_date")

        if start_date >= end_date:
            raise serializers.ValidationError(
                "End date must be after start date."
            )

        vehicle = attrs["vehicle"]

        overlapping_booking = Booking.objects.filter(
            vehicle=vehicle,
            status__in=[
                Booking.BookingStatus.PENDING,
                Booking.BookingStatus.CONFIRMED,
            ],
            start_date__lt=end_date,
            end_date__gt=start_date,
        ).exists()

        if overlapping_booking:
            raise serializers.ValidationError(
                "This vehicle is already booked for the selected dates."
            )

        return attrs

    def create(self, validated_data):
        start_date = validated_data["start_date"]
        end_date = validated_data["end_date"]
        vehicle = validated_data["vehicle"]

        number_of_days = (end_date - start_date).days

        validated_data["total_price"] = (
            number_of_days * vehicle.price_per_day
        )

        return super().create(validated_data)