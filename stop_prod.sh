#!/bin/bash
set -e

echo "🛑 Stopping all project containers..."

docker-compose -f dc_postgres.yml -f dc_redis.yml -f dc_django.yml -f dc_django.prod.yml -f dc_airflow.yml down

echo "✅ All containers stopped."