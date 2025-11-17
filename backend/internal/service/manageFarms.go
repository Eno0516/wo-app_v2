package service

import (
	default_sql "database/sql"
	"time"

	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
	"github.com/Eno0516/wo-app-ver2/backend/generated/sql"
	"github.com/google/uuid"
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

func (s *Service) RegisterGroupFarms(groupUuid openapi_types.UUID, req api.FarmInfoDetail) error {
	// DB層を呼び出し
	// まずGroupFarmsに名前を登録
	farmUuid, err := s.dbRepo.RegisterFarms(groupUuid, req.FarmName)
	if err != nil {
		return err
	}

	// そのuuidで詳細情報を登録
	params := sql.CreateManageFarmInfoParams{
		FarmUuid:     farmUuid,
		FarmLength:   toNullString(req.FarmLength),
		FarmWidth:    toNullString(req.FarmWidth),
		FurrowNumber: toNullInt32(req.FurrowNumber),
		FarmSeason:   toInt32Slice(req.FarmSeasons),
		FarmYear: default_sql.NullInt32{
			Int32: int32(req.FarmYear),
			Valid: true,
		},
		CreatedBy: uuid.NullUUID{},
		UpdatedAt: default_sql.NullTime{Time: time.Now(), Valid: true},
		UpdatedBy: uuid.NullUUID{},
	}
	registerErr := s.dbRepo.RegisterFarmInfo(params)
	if registerErr != nil {
		return err
	}
	return nil
}

func (s *Service) UpdateGroupFarms(groupUuid openapi_types.UUID, req api.FarmInfoDetail) error {
	// DB層を呼び出し
	return nil
}

// ヘルパー関数
func toNullString(s string) default_sql.NullString {
	if s == "" {
		return default_sql.NullString{Valid: false}
	}
	return default_sql.NullString{String: s, Valid: true}
}
func toNullInt32(f *int) default_sql.NullInt32 {
	if f == nil {
		return default_sql.NullInt32{Valid: false}
	}
	return default_sql.NullInt32{Int32: int32(*f), Valid: true}
}
func toInt32Slice(ints []int) []int32 {
	res := make([]int32, len(ints))
	for i, v := range ints {
		res[i] = int32(v)
	}
	return res
}
