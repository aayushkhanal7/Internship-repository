from rest_framework import serializers
from .models import Vehicle


class VehicleSerializer(serializers.ModelSerializer):
    owner_email = serializers.EmailField(source="owner.email", read_only=True)

    def validate_price_per_day(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Price per day must be greater than zero."
            )
        return value

    class Meta:
        model = Vehicle
        fields = (
            "id",
            "owner",
            "owner_email",
            "name",
            "brand",
            "vehicle_type",
            "description",
            "price_per_day",
            "location",
            "is_available",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "owner",
            "created_at",
            "updated_at",
        )