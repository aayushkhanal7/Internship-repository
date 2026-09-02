from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import Vehicle
from .serializers import VehicleSerializer
from .permissions import IsVehicleOwnerOrReadOnly


class VehicleListCreateView(generics.ListCreateAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ["name", "brand"]
    filterset_fields = ["vehicle_type", "location"]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class VehicleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsVehicleOwnerOrReadOnly,
    ]
