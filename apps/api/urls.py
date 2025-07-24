from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginView

urlpatterns = [
    path('usuarios/', include('apps.usuario.urls')),
    path('operacoes/', include('apps.operacao.urls')),
    path('login/', LoginView.as_view(), name='api-login')
]
