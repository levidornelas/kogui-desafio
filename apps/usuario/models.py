from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
  data_inclusao = models.DateField(auto_now_add=True)

  def __str__(self):
    return f'Usuário {self.username} criado em {self.data_inclusao}'