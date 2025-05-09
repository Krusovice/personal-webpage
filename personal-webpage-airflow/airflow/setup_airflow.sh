#!/bin/bash

# Wait for Airflow DB to be ready
airflow db upgrade

# Create user if not exists
airflow users create \
  --username airflow \
  --firstname Air \
  --lastname Flow \
  --role Admin \
  --email airflow@example.com \
  --password airflow \
  || echo "User already exists"

# Add Postgres connection if it doesn't exist
EXISTING_CONN=$(airflow connections get webpage_postgres_db 2>/dev/null)

if [[ $? -ne 0 ]]; then
  airflow connections add 'webpage_postgres_db' \
    --conn-uri 'postgresql://Krusovice:fedefrede@postgres:5432/webpage_db'
  echo "PostgreSQL connection created."
else
  echo "PostgreSQL connection already exists."
fi

# Start Airflow
exec airflow webserver
