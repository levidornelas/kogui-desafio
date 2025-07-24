from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import CadastroUsuarioViewSet


router = DefaultRouter()
router.register(r'', CadastroUsuarioViewSet, basename='usuarios')

urlpatterns = [
  path('', include(router.urls))
]