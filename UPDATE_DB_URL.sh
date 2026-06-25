#!/bin/bash

# Script to update the Drew Porsches Web Service with the Database URL
# Usage: ./UPDATE_DB_URL.sh "postgresql://user:password@host:5432/database"

if [ -z "$1" ]; then
  echo "Usage: $0 <DATABASE_URL>"
  echo ""
  echo "To get your DATABASE_URL:"
  echo "1. Go to: https://dashboard.render.com/d/dpg-d8u9itu8bjmc73dim95g-a"
  echo "2. Look for 'Internal Database URL'"
  echo "3. Copy it (format: postgresql://user:password@host:5432/database)"
  echo "4. Run: $0 'paste-the-url-here'"
  exit 1
fi

DATABASE_URL="$1"
SERVICE_ID="srv-d8u9igm7r5hc73f77jmg"

# Get fresh API key from 1Password
API_KEY=$(op item get vsronunlyscn2lm7etqciwg6tu --reveal --fields="label=API Key" --format=json 2>/dev/null | jq -r .value)

if [ -z "$API_KEY" ]; then
  echo "Error: Could not retrieve Render API key from 1Password"
  exit 1
fi

echo "Updating Web Service with DATABASE_URL..."

curl -s -X PATCH https://api.render.com/v1/services/$SERVICE_ID \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"envVars\": [
      {
        \"key\": \"NEXTAUTH_SECRET\",
        \"value\": \"CHWVdfIADJscHbgsxvP0ev7v/PenNOfIiEUuzu1HAZQ=\"
      },
      {
        \"key\": \"NEXTAUTH_URL\",
        \"value\": \"https://drew-porsches.onrender.com\"
      },
      {
        \"key\": \"DATABASE_URL\",
        \"value\": \"$DATABASE_URL\"
      }
    ]
  }" | jq .

echo ""
echo "✅ Web Service updated!"
echo "Render will automatically redeploy. Monitor at: https://dashboard.render.com/web/srv-d8u9igm7r5hc73f77jmg"
