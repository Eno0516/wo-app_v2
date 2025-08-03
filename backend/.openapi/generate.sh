#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "📦 Bundling openapi.yaml..."
npx @redocly/cli bundle openapi.yaml --output bundled.yaml

openapi-generator-cli generate \
    -i bundled.yaml \
    -g go \
    -o ../generated/api \
    -c config.json