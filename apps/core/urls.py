from django.urls import path
from .views import CadastroPageView, LoginPageView, CalculadoraView

urlpatterns = [
  path('', LoginPageView.as_view(), name='login'),
  path('cadastro/', CadastroPageView.as_view(), name='cadastro'),
  path('calculadora/', CalculadoraView.as_view(), name='calculadora')
]