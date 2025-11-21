package db

import (
	"context"

	"github.com/Eno0516/wo-app-ver2/backend/generated/sql"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

func (r *DBRepositry) GetCellsInfoByFurrow(farmManageUuid openapi_types.UUID, furrowId int32) ([]sql.GetFullCellInfoByFurrowRow, error) {
	ctx := context.Background()
	params := sql.GetFullCellInfoByFurrowParams{
		FarmManageUuid: farmManageUuid,
		FurrowID:       furrowId,
	}
	dbRes, err := r.q.GetFullCellInfoByFurrow(ctx, params)
	if err != nil {
		return []sql.GetFullCellInfoByFurrowRow{}, err
	}
	return dbRes, nil
}
