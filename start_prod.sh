#!/bin/bash
set -e

NETWORK_NAME="webpage_network"

echo "🔧 Fixing folder permissions..."

# Ensure correct ownership and access
sudo chown -R "$USER:$USER" ./postgres/postgres_data || true
chmod -R 755 ./postgres/postgres_data || true

sudo chown -R "$USER:$USER" ./redis/redis_data || true
chmod -R 755 ./redis/redis_data || true

chmod +x django/hosting/django_bash_command.sh

echo "✅ Permissions fixed."

echo "🔍 Checking for Docker network: $NETWORK_NAME..."
if ! docker network ls --format '{{.Name}}' | grep -q "^${NETWORK_NAME}$"; then
    echo "🛠  Network '$NETWORK_NAME' not found. Creating it..."
    docker network create "$NETWORK_NAME"
else
    echo "✅ Network '$NETWORK_NAME' already exists."
fi

echo "🚀 Starting production environment..."

docker-compose -f dc_postgres.yml -f dc_redis.yml -f dc_django.yml -f dc_django.prod.yml -f dc_airflow.yml up --build -d

echo "✅ All services are up."
