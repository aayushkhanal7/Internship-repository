from rest_framework import generics

from .models import ContactMessage
from .serializers import ContactMessageSerializer
from .emails import send_contact_message_email


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        contact_message = serializer.save()

        send_contact_message_email(contact_message)