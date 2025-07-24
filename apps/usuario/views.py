from rest_framework import viewsets, mixins
from rest_framework import permissions

from .models import Usuario
from .serializers import UsuarioSerializer


class CadastroUsuarioViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
  permission_classes = [permissions.AllowAny]
  queryset = Usuario.objects.all()
  serializer_class = UsuarioSerializer