-- name: RegisterGroupFarm :one
INSERT INTO group_farms (group_uuid, farm_name)
VALUES ($1, $2)
RETURNING farm_uuid;

-- name: UpdateFarmName :exec
UPDATE group_farms
SET
  farm_name = $2,
  updated_at = now(),
  updated_by = $3
WHERE farm_uuid = $1;

-- name: CreateManageFarmInfo :exec
INSERT INTO manage_farms_info (
    farm_uuid,
    farm_length,
    farm_width,
    furrow_number,
    farm_season,
    farm_year,
    created_by,
    updated_at,
    updated_by
)
VALUES (
    $1,  -- farm_uuid
    $2,  -- farm_length
    $3,  -- farm_width
    $4,  -- furrow_number
    $5,  -- farm_season
    $6,  -- farm_year
    $7,  -- created_by (NULL許容)
    $8,  -- updated_at (NULL許容)
    $9  -- updated_by (NULL許容)
);

-- name: UpdateFarmInfo :exec
UPDATE manage_farms_info
SET
  farm_length   = $2,
  farm_width    = $3,
  furrow_number = $4,
  farm_season   = $5,
  farm_year     = $6,
  updated_at    = now(),
  updated_by    = $7
WHERE farm_manage_uuid = $1;
