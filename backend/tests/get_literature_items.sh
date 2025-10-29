curl -X POST http://127.0.0.1:5000/search_literature_items \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -d '{"searchKeywords":"a modern"}'