-- name: GetFurrowNumberByManageUuid :one
SELECT furrow_number
FROM manage_farms_info
WHERE farm_manage_uuid = $1;
