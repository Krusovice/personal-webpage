#!/bin/bash

python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput

chown -R www-data:www-data /django/staticfiles
chmod -R 755 /django/staticfiles

python manage.py shell -c "from literature.models import Item; from django.core.management import call_command; call_command('loaddata', 'literature/fixtures/literature.json') if not Item.objects.exists() else None"

if [ \"$DJANGO_ENV\" = \"production\" ]; then
  daphne -b 0.0.0.0 -p 8000 personalWebpage.asgi:application
else
  pip uninstall -y daphne
  python manage.py runserver 0.0.0.0:8000
fi
