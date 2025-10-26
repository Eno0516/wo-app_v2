#!/usr/bin/env bash
set -euo pipefail

# このスクリプトの場所からリポジトリルートを特定
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

SQLC_BIN="$(go env GOPATH)/bin/sqlc"

if [ ! -x "$SQLC_BIN" ]; then
  echo "sqlc not found at $SQLC_BIN. Run: go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest"
  exit 1
fi

# sqlc.yaml の場所を指定して実行
"$SQLC_BIN" generate --file "$REPO_ROOT/backend/sqlc/sqlc.yaml"
