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

func (impl DefaultAPIImpl) GetManagePlant(c *gin.Context) {
	impl.ManagePlantGrid.GetManagePlant(c)
}

func (impl DefaultAPIImpl) PostLogin(c *gin.Context) {
	impl.Login.PostLogin(c)
}

func (impl DefaultAPIImpl) GetGroupsGroupUuidManageFarms(c *gin.Context, groupUuid openapi_types.UUID) {
	impl.ManageFarms.GetGroupsGroupUuidManageFarms(c, groupUuid)
}
