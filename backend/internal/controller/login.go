package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type LoginAPI struct{}

// "/api/login"
func (api LoginAPI) PostLogin(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"plant": "rose"})
}
