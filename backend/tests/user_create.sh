curl -i -X POST http://127.0.0.1:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "registration_key": "mockKey",
    "email": "test@test.dk",
    "username": "joe",
    "password": "test",
    "first_name": "Joe",
    "last_name": "Example",
    "company": "test"
  }'