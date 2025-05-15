@echo off
echo Starting development environment...
docker-compose -f dc_postgres.yml -f dc_airflow.yml up
pause