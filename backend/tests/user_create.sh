curl -i -X POST http://127.0.0.1:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joe@example.com",
    "username": "joe",
    "password": "Secret123!",
    "first_name": "Joe",
    "last_name": "Example",
    "company": "Acme"
  }'