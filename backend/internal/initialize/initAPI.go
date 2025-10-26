package initialize

import (
	"time"

	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
	"github.com/Eno0516/wo-app-ver2/backend/internal/controller"
	"github.com/Eno0516/wo-app-ver2/backend/internal/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// API登録の初期化処理
func InitAPI(allowdOrigin string, svc *service.Service) *gin.Engine {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{allowdOrigin},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	apiGroup := router.Group("/api")

	// 増えたら追加する
	impl := controller.DefaultAPIImpl{
		ManagePlantGrid: controller.NewManagePlantGridAPI(svc),
		Login:           controller.NewLoginAPI(svc),
	}
	api.RegisterHandlers(apiGroup, impl)
	return router
}
