from django.shortcuts import render
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user) 
            return Response({'detail': 'Login realizado com sucesso'})
        else:
            return Response({'detail': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)