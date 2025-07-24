from rest_framework import viewsets, permissions

from .models import Operacao
from .serializers import OperacaoSerializer


class OperacaoViewSet(viewsets.ModelViewSet):
  queryset = Operacao.objects.all()
  model = Operacao
  permission_classes = [permissions.IsAuthenticated]
  serializer_class = OperacaoSerializer