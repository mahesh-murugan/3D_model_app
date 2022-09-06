
from django.urls import path

from . import views


urlpatterns = [
    path('model-3d/', views.Model3DAPIView.as_view(), name="model_3d_view"),
]