from django.db import models
from apps.usuario.models import Usuario


class Operacao(models.Model):
  id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
  parametros = models.CharField(null=False)
  resultado = models.CharField(null=False)
  data_inclusao = models.DateField(auto_now_add=True)

  def __str__(self):
    return f'Operação do usuário {self.id_usuario.username.capitalize()} realizada em {self.data_inclusao}'
  
  class Meta:
    verbose_name = 'Operação'
    verbose_name_plural = 'Operações'