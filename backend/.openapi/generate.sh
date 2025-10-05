#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "⚙️ Generating Go Gin interfaces and types..."
oapi-codegen \
  -generate types,gin \
  -o ../generated/api/api.gen.go \
  -package api \
  ../../openapi/bundled.yaml

