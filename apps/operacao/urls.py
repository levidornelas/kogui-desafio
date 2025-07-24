from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import OperacaoViewSet


router = DefaultRouter()
router.register(r'', OperacaoViewSet, basename='operacoes')

urlpatterns = [
  path('', include(router.urls))
]