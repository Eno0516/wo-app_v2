package db

import (
	"context"

	"github.com/Eno0516/wo-app-ver2/backend/generated/sql"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

func (r *DBRepositry) GetFurrows(farmManageUuid openapi_types.UUID) (int32, error) {
	ctx := context.Background()
	dbRes, err := r.q.GetFurrowNumberByManageUuid(ctx, farmManageUuid)
	if err != nil {
		return 0, err
	}
	return dbRes.Int32, nil
}

func (r *DBRepositry) GetFurrowInfo(farmManageUuid openapi_types.UUID, rowId int32) (sql.GetFurrowInfoByRowIdRow, error) {
	ctx := context.Background()
	params := sql.GetFurrowInfoByRowIdParams{
		FarmManageUuid: farmManageUuid,
		FurrowID:       rowId,
	}
	dbRes, err := r.q.GetFurrowInfoByRowId(ctx, params)
	if err != nil {
		return sql.GetFurrowInfoByRowIdRow{}, err
	}
	return dbRes, nil
}

func (r *DBRepositry) CreateFurrowInfo(params sql.CreateFurrowInfoParams) error {
	ctx := context.Background()
	err := r.q.CreateFurrowInfo(ctx, params)
	if err != nil {
		return err
	}
	return nil
}

func (r *DBRepositry) UpdateFurrowInfo(params sql.UpdateFurrowInfoParams) error {
	ctx := context.Background()
	err := r.q.UpdateFurrowInfo(ctx, params)
	if err != nil {
		return err
	}
	return nil
}
