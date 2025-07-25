from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from .models import Operacao
from .serializers import OperacaoSerializer


class OperacaoViewSet(viewsets.ModelViewSet):
  model = Operacao
  permission_classes = [permissions.IsAuthenticated]
  serializer_class = OperacaoSerializer

  def get_queryset(self):
        return Operacao.objects.filter(id_usuario=self.request.user)

  def perform_create(self, serializer):
    return serializer.save(id_usuario=self.request.user)
  
  @action(detail=False, methods=['delete'], url_path='deletar_todas')
  def deletar_todas(self, request):
        operacoes = self.get_queryset()
        operacoes.delete()
        return Response({'mensagem': f'operações excluídas com sucesso.'}, status=status.HTTP_204_NO_CONTENT)