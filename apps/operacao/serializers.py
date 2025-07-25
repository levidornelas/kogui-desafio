from .models import Operacao
from rest_framework import serializers


class OperacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operacao
        fields = ['id', 'id_usuario', 'parametros', 'resultado', 'data_inclusao']
        read_only_fields = ['id', 'data_inclusao', 'id_usuario']