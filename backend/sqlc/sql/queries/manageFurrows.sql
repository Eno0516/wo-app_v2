-- name: GetFurrowNumberByManageUuid :one
SELECT furrow_number
FROM manage_farms_info
WHERE farm_manage_uuid = $1;

-- name: GetFurrowInfoByRowId :one
SELECT rows, min_plant_spacing, furrow_width,furrow_length
FROM manage_furrows
WHERE farm_manage_uuid = $1
  AND furrow_id = $2;

-- name: CreateFurrowInfo :exec
INSERT INTO manage_furrows (
  farm_manage_uuid,
  furrow_id,
  rows,
  min_plant_spacing,
  furrow_width,
  furrow_length
)
VALUES (
  $1,  -- farm_manage_uuid
  $2,  -- furrow_id
  $3,  -- rows
  $4,  -- min_plant_spacing
  $5,  -- furrow_width
  $6   -- furrow_length
);
