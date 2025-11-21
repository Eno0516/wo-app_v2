CREATE TABLE manage_variable_cells (
  cell_id UUID PRIMARY KEY,           -- 対象セルのUUID（manage_cell_info.cell_idと一致）
  date_harvest_planted DATE,          -- 収穫日（NULL可）
  memo VARCHAR(255),                  -- メモ（NULL可）

  FOREIGN KEY (cell_id) REFERENCES manage_cells(cell_id) ON DELETE CASCADE
);
