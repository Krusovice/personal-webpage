curl -i -X POST http://127.0.0.1:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"1@1.dk","password":"1"}' \
  -c cookies.txt