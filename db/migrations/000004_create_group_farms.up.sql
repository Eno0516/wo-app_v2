-- Group Farms テーブル作成
CREATE TABLE group_farms (
  group_uuid   UUID NOT NULL,
  farm_name    TEXT NOT NULL,
  farm_uuid    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at   TIMESTAMP DEFAULT NOW(),
  created_by   UUID NOT NULL,
  updated_at   TIMESTAMP DEFAULT NOW(),
  updated_by   UUID NOT NULL
);
