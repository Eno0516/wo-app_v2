package db

import (
	"context"
	default_sql "database/sql"
	"time"

	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
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

func (r *DBRepositry) CreateCellInfo(farmManageUuid openapi_types.UUID, furrowId int32, cellInfo api.CellInfo) error {
	ctx := context.Background()
	cellParams := sql.CreateCellParams{
		FarmManageUuid: farmManageUuid,
		FurrowID:       furrowId,
		CellRow:        cellInfo.CellRow,
		CellColumn:     cellInfo.CellColumn,
	}
	cellErr := r.q.CreateCell(ctx, cellParams)
	if cellErr != nil {
		return cellErr
	}
	uuidParams := sql.GetCellUuidParams{
		FarmManageUuid: farmManageUuid,
		FurrowID:       furrowId,
		CellRow:        cellInfo.CellRow,
		CellColumn:     cellInfo.CellColumn,
	}
	cellUuid, uuidErr := r.q.GetCellUuid(ctx, uuidParams)
	if uuidErr != nil {
		return uuidErr
	}
	layout := "2006-01-02"
	var plantedAt default_sql.NullTime
	if cellInfo.DatePlanted != "" {
		t, timeErr := time.Parse(layout, cellInfo.DatePlanted)
		if timeErr != nil {
			return timeErr
		}
		plantedAt = default_sql.NullTime{
			Time:  t,
			Valid: true,
		}
	} else {
		plantedAt = default_sql.NullTime{
			Valid: false,
		}
	}
	invarCellParams := sql.CreateInvariableCellInfoParams{
		CellID:      cellUuid,
		Item:        cellInfo.CropItem,
		Variety:     cellInfo.Variety,
		DatePlanted: plantedAt.Time,
	}
	invarCellerr := r.q.CreateInvariableCellInfo(ctx, invarCellParams)
	if invarCellerr != nil {
		return invarCellerr
	}
	var harvestAt default_sql.NullTime
	if cellInfo.DateHarvestPlanted != "" {
		ht, hTimeErr := time.Parse(layout, cellInfo.DateHarvestPlanted)
		if hTimeErr != nil {
			return hTimeErr
		}
		harvestAt = default_sql.NullTime{
			Time:  ht,
			Valid: true,
		}
	} else {
		harvestAt = default_sql.NullTime{
			Valid: false,
		}
	}

	nMemo := default_sql.NullString{
		String: cellInfo.Memo,
		Valid:  true,
	}
	varCellParas := sql.CreateVariableCellInfoParams{
		CellID:             cellUuid,
		DateHarvestPlanted: harvestAt,
		Memo:               nMemo,
	}
	varCellErr := r.q.CreateVariableCellInfo(ctx, varCellParas)
	if varCellErr != nil {
		return varCellErr
	}
	nPoorReason := default_sql.NullInt32{
		Int32: cellInfo.PoorGrowthReason,
		Valid: true,
	}
	healthParams := sql.CreateHealthCellInfoParams{
		CellID:           cellUuid,
		GrowthStage:      cellInfo.GrowthStage,
		Status:           cellInfo.Status,
		PoorGrowthReason: nPoorReason,
	}
	healthErr := r.q.CreateHealthCellInfo(ctx, healthParams)
	if healthErr != nil {
		return healthErr
	}
	return nil
}

func (r *DBRepositry) UpdateCellInfo(farmManageUuid openapi_types.UUID, furrowId int32, cellInfo api.CellInfo) error {
	ctx := context.Background()
	uuidParams := sql.GetCellUuidParams{
		FarmManageUuid: farmManageUuid,
		FurrowID:       furrowId,
		CellRow:        cellInfo.CellRow,
		CellColumn:     cellInfo.CellColumn,
	}
	cellUuid, uuidErr := r.q.GetCellUuid(ctx, uuidParams)
	if uuidErr != nil {
		return uuidErr
	}
	layout := "2006-01-02"
	var plantedAt default_sql.NullTime
	if cellInfo.DatePlanted != "" {
		t, timeErr := time.Parse(layout, cellInfo.DatePlanted)
		if timeErr != nil {
			return timeErr
		}
		plantedAt = default_sql.NullTime{
			Time:  t,
			Valid: true,
		}
	} else {
		plantedAt = default_sql.NullTime{
			Valid: false,
		}
	}
	invarCellParams := sql.UpdateInvariableCellInfoParams{
		CellID:      cellUuid,
		Item:        cellInfo.CropItem,
		Variety:     cellInfo.Variety,
		DatePlanted: plantedAt.Time,
	}
	invarCellerr := r.q.UpdateInvariableCellInfo(ctx, invarCellParams)
	if invarCellerr != nil {
		return invarCellerr
	}

	var harvestAt default_sql.NullTime
	if cellInfo.DateHarvestPlanted != "" {
		ht, hTimeErr := time.Parse(layout, cellInfo.DateHarvestPlanted)
		if hTimeErr != nil {
			return hTimeErr
		}
		harvestAt = default_sql.NullTime{
			Time:  ht,
			Valid: true,
		}
	} else {
		harvestAt = default_sql.NullTime{
			Valid: false,
		}
	}

	nMemo := default_sql.NullString{
		String: cellInfo.Memo,
		Valid:  true,
	}
	varCellParas := sql.UpdateVariableCellInfoParams{
		CellID:             cellUuid,
		DateHarvestPlanted: harvestAt,
		Memo:               nMemo,
	}
	varCellErr := r.q.UpdateVariableCellInfo(ctx, varCellParas)
	if varCellErr != nil {
		return varCellErr
	}
	nPoorReason := default_sql.NullInt32{
		Int32: cellInfo.PoorGrowthReason,
		Valid: true,
	}
	healthParams := sql.UpdateHealthCellInfoParams{
		CellID:           cellUuid,
		GrowthStage:      cellInfo.GrowthStage,
		Status:           cellInfo.Status,
		PoorGrowthReason: nPoorReason,
	}
	healthErr := r.q.UpdateHealthCellInfo(ctx, healthParams)
	if healthErr != nil {
		return healthErr
	}
	return nil
}
