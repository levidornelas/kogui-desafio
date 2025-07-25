from rest_framework import viewsets, mixins
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import authenticate, login
from .models import Usuario
from .serializers import UsuarioSerializer


class CadastroUsuarioViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
  permission_classes = [permissions.AllowAny]
  queryset = Usuario.objects.all()
  serializer_class = UsuarioSerializer



class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user) 
            return Response({'detail': 'Login realizado com sucesso'})
        else:
            return Response({'detail': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)