package controller

import (
	"net/http"

	"github.com/Eno0516/wo-app-ver2/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type ManagePlantGridAPI struct {
	svc *service.Service
}

func NewManagePlantGridAPI(svc *service.Service) *ManagePlantGridAPI {
	return &ManagePlantGridAPI{svc: svc}
}

// "/api/plant"
func (m *ManagePlantGridAPI) GetManagePlant(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"plant": "rose"})
}
