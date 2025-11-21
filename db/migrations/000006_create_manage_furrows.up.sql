CREATE TABLE manage_furrows (
  farm_manage_uuid UUID NOT NULL,
  furrow_id INTEGER NOT NULL,
  rows INTEGER NOT NULL,
  min_plant_spacing INTEGER NOT NULL,
  furrow_width INTEGER NOT NULL,
  furrow_length INTEGER NOT NULL,

  PRIMARY KEY (farm_manage_uuid, furrow_id),
  FOREIGN KEY (farm_manage_uuid) REFERENCES manage_farms_info(farm_manage_uuid) ON DELETE CASCADE
);
