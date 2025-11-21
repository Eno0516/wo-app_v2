-- name: GetFurrowNumberByManageUuid :one
SELECT furrow_number
FROM manage_farms_info
WHERE farm_manage_uuid = $1;

-- name: GetFurrowInfoByRowId :one
SELECT rows, min_plant_spacing, furrow_width,furrow_length
FROM manage_furrow
WHERE farm_manage_uuid = $1
  AND furrow_id = $2;
