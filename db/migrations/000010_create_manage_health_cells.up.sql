CREATE TABLE manage_health_cells (
  cell_id UUID PRIMARY KEY,           -- 対象セルのUUID（manage_cell_info.cell_idと一致）
  growth_stage INTEGER NOT NULL,      -- 成長段階（数値で管理）
  status INTEGER NOT NULL,            -- 状態（数値で管理）
  poor_growth_reason INTEGER,         -- 成長不良の理由ID（NULL可）

  FOREIGN KEY (cell_id) REFERENCES manage_cells(cell_id) ON DELETE CASCADE
);
