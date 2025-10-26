package controller

import (
	"github.com/gin-gonic/gin"
)

type DefaultAPIImpl struct {
	ManagePlantGrid *ManagePlantGridAPI
	Login           *LoginAPI
}

func (impl DefaultAPIImpl) GetManagePlant(c *gin.Context) {
	impl.ManagePlantGrid.GetManagePlant(c)
}

func (impl DefaultAPIImpl) PostLogin(c *gin.Context) {
	impl.Login.PostLogin(c)
}
