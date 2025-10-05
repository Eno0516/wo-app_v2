set -e
cd "$(dirname "$0")"

npx openapi-typescript-codegen \
  --input ../../openapi/bundled.yaml \
  --output ../src/generated/api \
  --client axios