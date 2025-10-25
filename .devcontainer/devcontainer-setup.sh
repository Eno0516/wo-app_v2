#!/bin/bash
set -e

# OpenAPI CLI
npm install -g @openapitools/openapi-generator-cli

# Redocly / OpenAPI generator scriptsに実行権限
chmod +x /workspace/openapi/redocly.sh /workspace/frontend/.openapi/generate.sh

# Go modules
cd backend && go mod tidy && go mod download
cd ..

# DB が応答するまで待機
echo "Waiting for db to be ready..."
until pg_isready -h db -p 5432 -U devuser; do
  sleep 2
done

# DBマイグレーション
migrate -path db/migrations -database "$DATABASE_URL" up
