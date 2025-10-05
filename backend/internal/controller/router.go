package controller

import "github.com/gin-gonic/gin"

type DefaultAPIImpl struct {
	ManagePlantGrid ManagePlantGridAPI
}

func (impl DefaultAPIImpl) GetPlant(c *gin.Context) {
	impl.ManagePlantGrid.GetPlant(c)
}
