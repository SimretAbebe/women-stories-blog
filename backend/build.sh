#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Create static directory if it doesn't exist
mkdir -p staticfiles

python manage.py collectstatic --noinput
python manage.py migrate

if [ "$DJANGO_SUPERUSER_USERNAME" ];
then
  python manage.py createsuperuser \
    --no-input \
    --username $DJANGO_SUPERUSER_USERNAME \
    --email $DJANGO_SUPERUSER_EMAIL || true
fi
