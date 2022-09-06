from wsgiref.validate import validator
from rest_framework import serializers
from rest_framework.validators import ValidationError
from .models import Model3D
import os


def validate_file_extension(value):
    
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.gltf', '.glb', '.fbx']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')


class Model3DSerializer(serializers.ModelSerializer):
    file = serializers.FileField(required=True, validators=[validate_file_extension])

    class Meta:
        model = Model3D
        fields = ['name', 'description', 'file']

    def create(self, validated_data):
        request = self.context.get("request")
        user = None
        if request and hasattr(request, "user"):
            user = request.user

        model_3d = Model3D.objects.create(
            name=validated_data['name'],
            description=validated_data['description'],
            file=validated_data['file'],
            user=user
        )

        return model_3d