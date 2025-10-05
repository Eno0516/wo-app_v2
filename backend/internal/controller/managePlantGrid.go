package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ManagePlantGridAPI struct{}

// "/api/plant"
func (api ManagePlantGridAPI) GetPlant(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"plant": "rose"})
}
