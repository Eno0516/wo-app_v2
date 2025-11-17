CREATE TABLE manage_farms_info (
    farm_uuid UUID NOT NULL,
    farm_manage_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4() ,
    farm_length TEXT,
    farm_width TEXT,
    furrow_number INTEGER,
    furrow_width TEXT,
    farm_season INTEGER[],         -- 数値の配列
    farm_year INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    created_by UUID,
    updated_at TIMESTAMP,
    updated_by UUID
);
