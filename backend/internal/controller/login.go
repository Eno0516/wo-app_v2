package controller

import (
	"log"
	"net/http"

	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
	appError "github.com/Eno0516/wo-app-ver2/backend/internal/error"
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

	res, err := l.svc.LoginUserCheck(req)
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
	log.Print("res", res)
	c.JSON(http.StatusOK, res)
}
