package db

import (
	"context"

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
