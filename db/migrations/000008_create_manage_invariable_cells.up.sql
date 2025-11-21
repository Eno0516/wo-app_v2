CREATE TABLE manage_invariable_cells (
  cell_id UUID PRIMARY KEY,           -- 対象セルのUUID（manage_cell_info.cell_idと一致）
  item TEXT NOT NULL,                 -- 品目（作物の種類）
  variety TEXT NOT NULL,              -- 品種
  date_planted DATE NOT NULL,         -- 植えた日

  FOREIGN KEY (cell_id) REFERENCES manage_cells(cell_id) ON DELETE CASCADE
);
