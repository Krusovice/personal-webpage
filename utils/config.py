import webpage_secrets

POSTGRES_CONFIG = {
    "dbname": "webpage_db",
    "user": webpage_secrets.POSTGRES_USER,
    "password": webpage_secrets.POSTGRES_PASSWORD,
    "host": "postgres",
    "port": "5432"
}

DJANGO_SECRET_KEY = webpage_secrets.DJANGO_SECRET_KEY

KAFKA_CONFIG = {
    "bootstrap_servers": "kafka:9092",
    "auto_offset_reset": "latest",
    "enable_auto_commit": True
}

REDIS_CONFIG = {
    "host": "redis",
    "port": 6379
}