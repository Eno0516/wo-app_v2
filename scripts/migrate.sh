 # このスクリプトのあるディレクトリを基準にリポジトリルートを特定
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MIGRATIONS_DIR="$REPO_ROOT/db/migrations"

migrate -path ${MIGRATIONS_DIR} -database "postgres://devuser:devpass@database:5432/mydb?sslmode=disable" up