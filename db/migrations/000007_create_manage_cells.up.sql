CREATE TABLE manage_cells (
  cell_id UUID PRIMARY KEY, -- セル固有ID
  farm_manage_uuid UUID NOT NULL, -- 管理対象の農場UUID
  furrow_id INTEGER NOT NULL,     -- 畝ID（行番号に相当）
  cell_row INTEGER NOT NULL,      -- 行番号
  cell_column INTEGER NOT NULL,   -- 列番号

  FOREIGN KEY (farm_manage_uuid) REFERENCES manage_farms_info(farm_manage_uuid) ON DELETE CASCADE,
  FOREIGN KEY (farm_manage_uuid,furrow_id) REFERENCES manage_furrows(furrow_id) ON DELETE CASCADE
);
