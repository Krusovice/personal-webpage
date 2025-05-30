#!/bin/bash
set -e

NETWORK_NAME="webpage_network"

echo "Checking for Docker network: $NETWORK_NAME..."
if ! docker network ls --format '{{.Name}}' | grep -q "^${NETWORK_NAME}$"; then
    echo "Network '$NETWORK_NAME' not found. Creating it..."
    docker network create "$NETWORK_NAME"
else
    echo "Network '$NETWORK_NAME' already exists."
fi

echo "Starting production environment..."

docker-compose -f dc_postgres.yml -f dc_redis.yml -f dc_django.yml -f dc_django.prod.yml -f dc_airflow.yml up --build -d


