package initialize

import (
	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
	"github.com/Eno0516/wo-app-ver2/backend/internal/controller"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// API登録の初期化処理
func InitAPI(allowdOrigin string) *gin.Engine {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{allowdOrigin},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}))
	apiGroup := router.Group("/api")

	// 増えたら追加する
	impl := controller.DefaultAPIImpl{
		ManagePlantGrid: controller.ManagePlantGridAPI{},
		Login:           controller.LoginAPI{},
	}
	api.RegisterHandlers(apiGroup, impl)
	return router
}
