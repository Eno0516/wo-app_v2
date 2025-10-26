-- name: GetLoginUser :one
SELECT id, uuid, username, created_at, updated_at
FROM users
WHERE username = $1
  AND password_hash = crypt($2, password_hash);
