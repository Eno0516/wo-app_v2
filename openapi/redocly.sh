#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "📦 Bundling openapi.yaml..."
npx @redocly/cli bundle openapi.yaml --output bundled.yaml