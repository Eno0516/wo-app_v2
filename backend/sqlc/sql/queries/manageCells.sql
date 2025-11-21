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
