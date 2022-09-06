from rest_framework import generics
from rest_framework.permissions import AllowAny
# from django.conf import settings
from account.serializers import RegisterSerializer


class RegisterAPIView(generics.CreateAPIView):
    '''API View to create new user'''
    permission_classes = [AllowAny,]
    serializer_class = RegisterSerializer

