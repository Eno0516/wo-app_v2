package controller

import (
	"net/http"

	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
	"github.com/Eno0516/wo-app-ver2/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type LoginAPI struct {
	svc *service.Service
}

func NewLoginAPI(svc *service.Service) *LoginAPI {
	return &LoginAPI{svc: svc}
}

// "/api/login"
func (l *LoginAPI) PostLogin(c *gin.Context) {
	var req api.LoginOrder
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	res := l.svc.LoginUserCheck(req)
	c.JSON(http.StatusOK, res)
}
