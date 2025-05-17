@echo off
docker exec -it postgres_db psql -U Krusovice -d webpage_db
pause