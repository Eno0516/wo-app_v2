package controller

import (
	"github.com/gin-gonic/gin"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

type DefaultAPIImpl struct {
	ManagePlantGrid *ManagePlantGridAPI
	Login           *LoginAPI
	ManageFarms     *ManageFarmsAPI
}

// ManagePlant
func (impl DefaultAPIImpl) GetManagePlant(c *gin.Context) {
	impl.ManagePlantGrid.GetManagePlant(c)
}

// Login
func (impl DefaultAPIImpl) PostLogin(c *gin.Context) {
	impl.Login.PostLogin(c)
}

// ManageFarm
func (impl DefaultAPIImpl) GetGroupsGroupUuidManageFarms(c *gin.Context, groupUuid openapi_types.UUID) {
	impl.ManageFarms.GetGroupsGroupUuidManageFarms(c, groupUuid)
}
func (impl DefaultAPIImpl) PostGroupsGroupUuidManageFarms(c *gin.Context, groupUuid openapi_types.UUID) {
	impl.ManageFarms.PostGroupsGroupUuidManageFarms(c, groupUuid)
}
func (impl DefaultAPIImpl) PutGroupsGroupUuidManageFarms(c *gin.Context, groupUuid openapi_types.UUID) {
	impl.ManageFarms.PutGroupsGroupUuidManageFarms(c, groupUuid)
}
