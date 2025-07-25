from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import CadastroUsuarioViewSet, LoginView


router = DefaultRouter()
router.register(r'cadastro', CadastroUsuarioViewSet, basename='usuarios')

urlpatterns = [
  path('login/', LoginView.as_view(), name='api-login'),
  path('', include(router.urls))
]