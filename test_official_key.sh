#!/bin/bash
clear
echo -n "sk-uY-tsP5pSWKJR25vrrxu1JBY7X5Tr3kC3CHmaGZnRAE: "
read -s SHANNON_KEY
echo -e "\n\nTesting Official API Endpoint..."

curl -i -X POST https://api.shannon-ai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "x-api-key: $SHANNON_KEY" \
  -H "Authorization: Bearer $SHANNON_KEY" \
  -d '{
    "model": "shannon-pro-1.6",
    "messages": [{"role": "user", "content": "ping"}],
    "max_tokens": 5
  }'
