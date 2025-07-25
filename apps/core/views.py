from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin


class LoginPageView(TemplateView):
    template_name = 'auth/login.html'
    

class CadastroPageView(TemplateView):
    template_name = 'auth/cadastro.html'


class CalculadoraView(LoginRequiredMixin, TemplateView):
    template_name = 'core/calculadora.html'