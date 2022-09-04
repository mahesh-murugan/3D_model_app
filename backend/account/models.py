from django.db import models

from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    
    email = models.EmailField(max_length=320, unique=True,)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        if self.email is not None:
            self.username = self.email
        super().save(*args, **kwargs)
    
