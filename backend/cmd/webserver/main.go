package main

import (
	"github.com/Eno0516/wo-app-ver2/internal/router"
)

func main() {
	r := router.NewRouter()
	r.Run(":8080")
}
