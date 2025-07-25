
#  Desafio Kogui  <br/> Calculadora com Login/Cadastro (Via API REST) 

Este é um projeto de API REST construída com **Django** e **Django REST Framework (DRF)** que permite:

-  Cadastro e login de usuários
- Realização de operações matemáticas
- Armazenamento das operações em banco de dados (SQLite)
-  Visualização do histórico de cálculos
-  Documentação automática com Swagger (drf-spectacular)

---

## Tecnologias Utilizadas

- Python 3.11
- Django
- Django REST Framework
- drf-spectacular (Swagger/OpenAPI)
- SQLite (banco de dados padrão)

---


### Após instalar as dependências, Execute as migrações e rode o servidor: 

```bash
python manage.py migrate
```
```bash
python manage.py runserver
```

---

## Autenticação

O sistema utiliza Autenticação via o modelo AbstractUser, o padrão do django.

### Rotas de autenticação:

* `POST /api/auth/cadastro/` → Cadastro de usuário
* `POST /api/auth/login/` → Login

---

## Rotas da Calculadora

* `GET /api/operacoes/` → Listar histórico de operações
* `POST /api/operacoes/` → Realizar uma nova operação
* `GET /api/operacoes/{id}/` → Ver detalhe de uma operação
* `PUT /api/operacoes/{id}/` → Atualizar operação
* `PATCH /api/operacoes/{id}/` → Atualização parcial
* `DELETE /api/operacoes/{id}/` → Excluir operação
* `DELETE /api/operacoes/deletar_todas/` → Excluir todas as operações

> Todas essas rotas exigem autenticação.

---

## Documentação (Swagger)

Acesse a documentação interativa da API:

👉 [`/api/swagger`](http://localhost:8000/api/swagger)

## Docker (opcional)

### Build da imagem:

```bash
docker build -t calculadora-api .
```

### Rodar o container:

```bash
docker run -p 8000:8000 calculadora-api
```