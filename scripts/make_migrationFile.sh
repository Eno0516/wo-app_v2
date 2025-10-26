#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  read -p "Enter migration name: " NAME
else
  NAME=$1
fi

# このスクリプトのあるディレクトリを基準にリポジトリルートを特定
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MIGRATIONS_DIR="$REPO_ROOT/db/migrations"

mkdir -p "$MIGRATIONS_DIR"

migrate create -ext sql -dir "$MIGRATIONS_DIR" -seq "$NAME"
