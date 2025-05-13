@echo off
echo Starting development environment...
docker-compose -f dc_postgres.yml -f dc_redis.yml -f dc_django.yml up
pause