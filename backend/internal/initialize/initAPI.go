package initialize

import (
	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
	"github.com/Eno0516/wo-app-ver2/backend/internal/controller"
	"github.com/gin-gonic/gin"
)

// API登録の初期化処理
func InitAPI() *gin.Engine {
	router := gin.Default()

	impl := controller.DefaultAPIImpl{
		ManagePlantGrid: controller.ManagePlantGridAPI{},
	}
	api.RegisterHandlers(router, impl)
	return router
}
