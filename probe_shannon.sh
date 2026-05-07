#!/bin/bash
# SHANNON OFFICIAL API: DETERMINISTIC PROBE v1.0
clear
KEY="sk-uY-tsP5pSWKJR25vrrxu1JBY7X5Tr3kC3CHmaGZnRAE"
URL="https://api.shannon-ai.com/v1/chat/completions"
DATA='{"model":"shannon-pro-1.6","messages":[{"role":"user","content":"ping"}],"max_tokens":5}'

echo "--- STARTING ARCHITECTURAL PROBE ---"
echo "Target: $URL"
echo "Key: $KEY"
echo "------------------------------------"

# Test 1: x-api-key
echo -n "[1/4] Testing 'x-api-key' header... "
curl -s -o /dev/null -w "Status: %{http_code}\n" -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $KEY" \
  -d "$DATA"

# Test 2: api-key
echo -n "[2/4] Testing 'api-key' header...   "
curl -s -o /dev/null -w "Status: %{http_code}\n" -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "api-key: $KEY" \
  -d "$DATA"

# Test 3: Bearer + Origin Mimicry
echo -n "[3/4] Testing 'Bearer' + Mimicry... "
curl -s -o /dev/null -w "Status: %{http_code}\n" -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $KEY" \
  -H "Origin: https://shannon-ai.com" \
  -H "Referer: https://shannon-ai.com/" \
  -d "$DATA"

# Test 4: Raw Authorization (No Bearer)
echo -n "[4/4] Testing Raw 'Authorization'... "
curl -s -o /dev/null -w "Status: %{http_code}\n" -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: $KEY" \
  -d "$DATA"

echo "------------------------------------"
echo "PROBE COMPLETE. ANALYZE STATUS CODES."
