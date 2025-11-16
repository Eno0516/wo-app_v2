-- name: GetLoginUser :one
SELECT 
  user_id, 
  group_id, 
  password_hash, 
  user_uuid,
  group_uuid,
  created_at, 
  updated_at
FROM users
WHERE user_id = $1
  AND group_id = $2;
