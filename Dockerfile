FROM python:3.11-slim

WORKDIR /app

COPY . /app/

RUN pip install --upgrade pip && \
  pip install -r requirements.txt

  
RUN python manage.py collectstatic --noinput


RUN python manage.py makemigrations && \
    python manage.py migrate

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
