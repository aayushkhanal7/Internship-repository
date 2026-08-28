from rest_framework import permissions


class IsVehicleOwnerOrReadOnly(permissions.BasePermission):
    """
    Allow authenticated users to view vehicles,
    but only the vehicle owner can update or delete them.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user