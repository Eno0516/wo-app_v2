-- name: GetFullCellInfoByFurrow :many
SELECT
  c.cell_row,
  c.cell_column,
  ic.item,
  ic.variety,
  ic.date_planted,
  hc.growth_stage,
  hc.status,
  hc.poor_growth_reason,
  vc.date_harvest_planted,
  vc.memo
FROM manage_cells c
LEFT JOIN manage_invariable_cells ic ON c.cell_id = ic.cell_id
LEFT JOIN manage_health_cells hc ON c.cell_id = hc.cell_id
LEFT JOIN manage_variable_cells vc ON c.cell_id = vc.cell_id
WHERE c.farm_manage_uuid = $1
  AND c.furrow_id = $2
ORDER BY c.cell_row, c.cell_column;

-- name: GetCellUuid :one
SELECT
  cell_id
FROM manage_cells
WHERE farm_manage_uuid = $1
  AND furrow_id = $2
  AND cell_row = $3
  AND cell_column = $4;

-- name: CreateCell :exec
INSERT INTO manage_cells (
  cell_id,
  farm_manage_uuid,
  furrow_id,
  cell_row,
  cell_column
)
VALUES (
  gen_random_uuid(),  
  $1, $2, $3, $4
);

-- name: CreateInvariableCellInfo :exec
INSERT INTO manage_invariable_cells (
  cell_id,
  item,
  variety,
  date_planted
)
VALUES (
  $1, $2, $3, $4
);

-- name: CreateVariableCellInfo :exec
INSERT INTO manage_variable_cells (
  cell_id,
  date_harvest_planted,
  memo
)
VALUES (
  $1, $2, $3
);

-- name: CreateHealthCellInfo :exec
INSERT INTO manage_health_cells (
  cell_id,
  growth_stage,
  status,
  poor_growth_reason
)
VALUES (
  $1, $2, $3, $4
);