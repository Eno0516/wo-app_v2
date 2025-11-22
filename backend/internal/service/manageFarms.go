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

func (s *Service) UpdateGroupFarms(farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID, req api.FarmInfoDetail) error {
	// DB層を呼び出し
	// 名前の更新
	err := s.dbRepo.UpdateFarmName(farmUuid, req.FarmName)
	if err != nil {
		return err
	}
	// 詳細の更新
	params := sql.UpdateFarmInfoParams{
		FarmManageUuid: farmManageUuid,
		FarmLength:     toNullString(req.FarmLength),
		FarmWidth:      toNullString(req.FarmWidth),
		FurrowNumber:   toNullInt32(req.FurrowNumber),
		FarmSeason:     toInt32Slice(req.FarmSeasons),
		FarmYear:       toNullInt32(&req.FarmYear),
		UpdatedBy:      uuid.NullUUID{},
	}
	errFarmInfo := s.dbRepo.UpdateFarmInfo(farmManageUuid, params)
	if errFarmInfo != nil {
		return errFarmInfo
	}

	return nil
}

func (s *Service) GetManageFarmsBasicInfo(farmUuid openapi_types.UUID) (res []api.FarmPageBasicInfo, err error) {
	// DB層を呼び出し
	// farmNameを取得
	farmName, err := s.dbRepo.GetFarmName(farmUuid)
	if err != nil {
		return []api.FarmPageBasicInfo{}, err
	}
	// それ以外を取得
	manageFarmsBasicInfo, err := s.dbRepo.GetManageFarmsBasicInfo(farmUuid)
	if err != nil {
		return []api.FarmPageBasicInfo{}, err
	}
	var response []api.FarmPageBasicInfo
	for _, m := range manageFarmsBasicInfo {
		response = append(response, api.FarmPageBasicInfo{
			FarmManageUuid: m.FarmManageUuid,
			FarmName:       farmName,
			FarmSeasons:    m.FarmSeason,
			FarmYear:       m.FarmYear.Int32,
		})
	}
	return response, nil
}

func (s *Service) GetManageFarmFurrowInfo(farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID) (api.FurrowBasicInfo, error) {
	// DB層呼び出し
	// 畝数を取得
	res, err := s.dbRepo.GetFurrows(farmManageUuid)
	if err != nil {
		return api.FurrowBasicInfo{}, err
	}
	response := api.FurrowBasicInfo{
		FurrowNumber: res,
	}
	return response, nil
}

// 畝と畝に紐付くCell情報
func (s *Service) GetManageFurrowAndCellInfo(farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID, rowId int32) (api.FurrowCellInfo, error) {
	// DB層を呼び出し
	// 畝の詳細情報を取得
	dbFurrowRes, err := s.dbRepo.GetFurrowInfo(farmManageUuid, rowId)
	if err != nil {
		return api.FurrowCellInfo{}, err
	}

	// 畝に紐付くCellの情報を取得
	dbCellRes, err := s.dbRepo.GetCellsInfoByFurrow(farmManageUuid, rowId)
	if err != nil {
		return api.FurrowCellInfo{}, err
	}
	// 整形
	var cellsRes []api.CellInfo
	for _, c := range dbCellRes {
		cellsRes = append(cellsRes, api.CellInfo{
			CellRow:            c.CellRow,
			CellColumn:         c.CellColumn,
			CropItem:           c.Item.String,
			Variety:            c.Variety.String,
			DatePlanted:        c.DatePlanted.Time.String(),
			Status:             c.Status.Int32,
			GrowthStage:        c.GrowthStage.Int32,
			DateHarvestPlanted: c.DateHarvestPlanted.Time.String(),
			PoorGrowthReason:   c.PoorGrowthReason.Int32,
			Memo:               c.Memo.String,
		})
	}

	return api.FurrowCellInfo{
		Rows:            dbFurrowRes.Rows,
		FurrowLength:    dbFurrowRes.FurrowLength,
		FurrowWidth:     dbFurrowRes.FurrowWidth,
		MinPlantSpacing: dbFurrowRes.MinPlantSpacing,
		CellInfoArray:   cellsRes,
	}, nil
}

// 畝・Cell情報を作成
func (s *Service) CreateFurrowCellInfo(farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID, rowId int32, req api.FurrowCellInfo) error {
	params := sql.CreateFurrowInfoParams{
		FarmManageUuid:  farmManageUuid,
		FurrowID:        rowId,
		Rows:            req.Rows,
		MinPlantSpacing: req.MinPlantSpacing,
		FurrowWidth:     req.FurrowWidth,
		FurrowLength:    req.FurrowLength,
	}
	err := s.dbRepo.CreateFurrowInfo(params)
	if err != nil {
		return err
	}
	// CellInfoも一括登録の場合は登録
	if len(req.CellInfoArray) > 0 {
		for _, cell := range req.CellInfoArray {
			err = s.dbRepo.CreateCellInfo(farmManageUuid, rowId, cell)
			if err != nil {
				return err
			}
		}
	}
	return nil
}

// 畝・Cell情報を更新
func (s *Service) UpdateFurrowCellInfo(farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID, rowId int32, req api.FurrowCellInfo) error {
	params := sql.UpdateFurrowInfoParams{
		FarmManageUuid:  farmManageUuid,
		FurrowID:        rowId,
		Rows:            req.Rows,
		MinPlantSpacing: req.MinPlantSpacing,
		FurrowWidth:     req.FurrowWidth,
		FurrowLength:    req.FurrowLength,
	}
	err := s.dbRepo.UpdateFurrowInfo(params)
	if err != nil {
		return err
	}
	// CellInfoも一括登録の場合は更新
	if len(req.CellInfoArray) > 0 {
		for _, cell := range req.CellInfoArray {
			err = s.dbRepo.UpdateCellInfo(farmManageUuid, rowId, cell)
			if err != nil {
				return err
			}
		}
	}
	return nil
}

// Cell情報を作成
func (s *Service) CreateCellInfo(farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID, rowId int32, req api.CellInfo) error {
	err := s.dbRepo.CreateCellInfo(farmManageUuid, rowId, req)
	if err != nil {
		return err
	}
	return nil
}

// Cell情報を更新
func (s *Service) UpdateCellInfo(farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID, rowId int32, req api.CellInfo) error {
	err := s.dbRepo.UpdateCellInfo(farmManageUuid, rowId, req)
	if err != nil {
		return err
	}
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
