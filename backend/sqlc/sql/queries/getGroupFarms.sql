-- name: GetGroupFarms :many
SELECT
    farm_name,
    farm_uuid
FROM
    group_farms
WHERE
    group_uuid = $1;
