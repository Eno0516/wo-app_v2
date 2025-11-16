package db

import (
	"context"
	"log"

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
