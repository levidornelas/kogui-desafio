from django.urls import path, include

urlpatterns = [
    path('auth/', include('apps.usuario.urls')),
    path('operacoes/', include('apps.operacao.urls')),
]
