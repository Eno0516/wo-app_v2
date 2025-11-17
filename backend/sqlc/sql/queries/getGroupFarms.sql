-- name: GetGroupFarms :many
SELECT
    farm_name,
    farm_uuid
FROM
    group_farms
WHERE
    group_uuid = $1;

-- name: GetFarmName :one
SELECT farm_name
FROM group_farms
WHERE farm_uuid = $1;

-- name: GetManageFarmsBasicInfo :many
SELECT
  farm_manage_uuid,
  farm_year,
  farm_season
FROM manage_farms_info
WHERE farm_uuid = $1;
