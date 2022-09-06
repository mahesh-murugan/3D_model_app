from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
# from django.conf import settings
from model_3d_app.serializers import Model3DSerializer
from .models import Model3D


class Model3DAPIView(generics.ListCreateAPIView):
    '''API View to create new user'''
    permission_classes = []
    serializer_class = Model3DSerializer
    model = Model3D

    def get_queryset(self):
        objects = self.model.objects.all()
        return objects



