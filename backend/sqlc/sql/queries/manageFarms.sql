-- name: RegisterGroupFarm :one
INSERT INTO group_farms (group_uuid, farm_name)
VALUES ($1, $2)
RETURNING farm_uuid;


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
