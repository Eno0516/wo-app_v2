package service

import (
	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

func (s *Service) GetGroupFarms(groupUuid openapi_types.UUID) ([]api.FarmInfo, error) {
	// DB層を呼び出し
	dbRes, err := s.dbRepo.GetFarms(groupUuid)
	if err != nil {
		return []api.FarmInfo{}, err
	}
	// 整形
	svcRes := make([]api.FarmInfo, len(dbRes))
	for i, row := range dbRes {
		svcRes[i] = api.FarmInfo{
			FarmName: row.FarmName,
			FarmUuid: row.FarmUuid,
		}
	}
	return svcRes, nil
}
