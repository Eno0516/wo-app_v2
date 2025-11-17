package db

import (
	"context"
	"log"

	"github.com/Eno0516/wo-app-ver2/backend/generated/sql"
	appError "github.com/Eno0516/wo-app-ver2/backend/internal/error"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

type FarmInfoRes struct {
	FarmName string
	FarmUuid openapi_types.UUID
}

func (r *DBRepositry) GetFarms(groupUuid openapi_types.UUID) ([]FarmInfoRes, error) {
	ctx := context.Background()
	dbRes, err := r.q.GetGroupFarms(ctx, groupUuid)
	if err != nil {
		return []FarmInfoRes{}, appError.NewError(404, "invalid GroupUuid", err)
	}
	log.Println("db", dbRes)
	farmInfos := make([]FarmInfoRes, len(dbRes))
	// 整形
	for i, row := range dbRes {
		farmInfos[i] = FarmInfoRes{
			FarmName: row.FarmName,
			FarmUuid: row.FarmUuid,
		}
	}
	return farmInfos, nil
}

func (r *DBRepositry) RegisterFarms(groupUuid openapi_types.UUID, farmName string) (openapi_types.UUID, error) {
	ctx := context.Background()
	parms := sql.RegisterGroupFarmParams{
		GroupUuid: groupUuid,
		FarmName:  farmName,
	}
	dbRes, err := r.q.RegisterGroupFarm(ctx, parms)
	if err != nil {
		return openapi_types.UUID{}, err
	}
	return dbRes, nil
}

func (r *DBRepositry) RegisterFarmInfo(params sql.CreateManageFarmInfoParams) error {
	ctx := context.Background()
	err := r.q.CreateManageFarmInfo(ctx, params)
	if err != nil {
		return err
	}
	return nil
}

func (r *DBRepositry) GetFarmName(farmUuid openapi_types.UUID) (farmName string, err error) {
	ctx := context.Background()
	dbRes, err := r.q.GetFarmName(ctx, farmUuid)
	if err != nil {
		return "", err
	}
	return dbRes, nil
}

func (r *DBRepositry) GetManageFarmsBasicInfo(farmUuid openapi_types.UUID) (res []sql.GetManageFarmsBasicInfoRow, err error) {
	ctx := context.Background()
	dbRes, err := r.q.GetManageFarmsBasicInfo(ctx, farmUuid)
	if err != nil {
		return []sql.GetManageFarmsBasicInfoRow{}, err
	}
	return dbRes, nil
}
