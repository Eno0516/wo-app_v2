-- name: GetLoginUser :one
SELECT id, uuid, username, password_hash, created_at, updated_at
FROM users
WHERE username = $1;
