package controller

import (
	"net/http"

	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
	appError "github.com/Eno0516/wo-app-ver2/backend/internal/error"
	"github.com/Eno0516/wo-app-ver2/backend/internal/service"
	"github.com/gin-gonic/gin"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

type ManageFarmsAPI struct {
	svc *service.Service
}

func NewManageFarmsAPI(svc *service.Service) *ManageFarmsAPI {
	return &ManageFarmsAPI{svc: svc}
}

func (m *ManageFarmsAPI) GetGroupsGroupUuidManageFarms(c *gin.Context, groupUuid openapi_types.UUID) {
	res, err := m.svc.GetGroupFarms(groupUuid)
	if err != nil {
		// AppErrorかどうか
		if appErr, ok := err.(*appError.AppError); ok {
			c.JSON(appErr.Status, gin.H{"error": appErr.DistributeError()})
			return
		}
		// 想定外のエラーは500
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}
	c.JSON(http.StatusOK, res)
}

func (m *ManageFarmsAPI) PostGroupsGroupUuidManageFarms(c *gin.Context, groupUuid openapi_types.UUID) {
	var req api.FarmInfoDetail
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	err := m.svc.RegisterGroupFarms(groupUuid, req)
	if err != nil {
		c.JSON(401, gin.H{"error": "register failed"})
		return
	}
}

func (m *ManageFarmsAPI) PutManageFarmsFarmUuidFarmManageUuid(c *gin.Context, farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID) {
	var req api.FarmInfoDetail
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	err := m.svc.UpdateGroupFarms(farmUuid, farmManageUuid, req)
	if err != nil {
		c.JSON(401, gin.H{"error": "update failed"})
		return
	}
}

func (m *ManageFarmsAPI) GetManageFarmsFarmUuid(c *gin.Context, farmUuid openapi_types.UUID) {
	res, err := m.svc.GetManageFarmsBasicInfo(farmUuid)
	if err != nil {
		c.JSON(401, gin.H{"error": "get farms failed"})
		return
	}
	c.JSON(http.StatusOK, res)
}

func (m *ManageFarmsAPI) GetManageFarmsFarmUuidFarmManageUuid(c *gin.Context, farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID) {
	res, err := m.svc.GetManageFarmFurrowInfo(farmUuid, farmManageUuid)
	if err != nil {
		c.JSON(401, gin.H{"error": "get farm furrow failed"})
		return
	}
	c.JSON(http.StatusOK, res)
}

// 畝に紐付くCell情報
func (m *ManageFarmsAPI) GetManageFarmsFarmUuidFarmManageUuidRowId(c *gin.Context, farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID, rowId int32) {
	res, err := m.svc.GetManageFurrowAndCellInfo(farmUuid, farmManageUuid, rowId)
	if err != nil {
		c.JSON(401, gin.H{"error": "get furrow and cell Info failed"})
		return
	}
	c.JSON(http.StatusOK, res)
}

// 畝・Cell情報を作成
func (m *ManageFarmsAPI) PostManageFarmsFarmUuidFarmManageUuidRowId(c *gin.Context, farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID, rowId int32) {
	var req api.FurrowCellInfo
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	m.svc.CreateFurrowCellInfo(farmUuid, farmManageUuid, rowId, req)
}

// 畝・Cell情報を更新
func (m *ManageFarmsAPI) PutManageFarmsFarmUuidFarmManageUuidRowId(c *gin.Context, farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID, rowId int32) {

}

// Cell情報を作成
func (m *ManageFarmsAPI) PostManageFarmsFarmUuidFarmManageUuidRowIdCell(c *gin.Context, farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID, rowId int32) {
	var req api.CellInfo
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	m.svc.CreateCellInfo(farmUuid, farmManageUuid, rowId, req)
}

// Cell情報を更新
func (m *ManageFarmsAPI) PutManageFarmsFarmUuidFarmManageUuidRowIdCell(c *gin.Context, farmUuid openapi_types.UUID, farmManageUuid openapi_types.UUID, rowId int32) {

}
