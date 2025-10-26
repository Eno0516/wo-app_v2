package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ManagePlantGridAPI struct{}

// "/api/plant"
func (m ManagePlantGridAPI) GetManagePlant(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"plant": "rose"})
}
