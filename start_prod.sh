#!/bin/bash
set -e

NETWORK_NAME="webpage_network"

echo "🔧 Fixing folder permissions..."

# Permissions format:
# chmod XYZ <file or directory>

# Where:
#  X = permissions for the owner
#  Y = permissions for the group
#  Z = permissions for everyone else (others)

# Legend:
#  7 = rwx  (read, write, execute)
#  6 = rw-  (read, write)
#  5 = r-x  (read, execute)
#  4 = r--  (read only)
#  3 = -wx  (write, execute)
#  2 = -w-  (write only)
#  1 = --x  (execute only)
#  0 = ---  (no permissions)

# Setting ownership to my pi user so i can modify files.
sudo chown -R $USER:$USER .

# Permission for postgres
sudo chmod 700 ./postgres/postgres_data

# Permission for django
chmod +x django/hosting/django_bash_command.sh
find django/staticfiles -type d -exec chmod 755 {} \; # rwx for each directory
find django/staticfiles -type f -exec chmod 644 {} \; # rw- for eachfile

# Permissions for Airflow (run as UID 50000, GID 0)
sudo chown -R 50000:0 ./dags ./logs ./plugins # Setting owner
sudo find ./dags ./logs ./plugins -type d -exec chmod 755 {} \; # rwx for each directory
sudo find ./dags ./logs ./plugins -type f -exec chmod 644 {} \; # rw for eachfile

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


