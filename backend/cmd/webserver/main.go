package main

import (
	"github.com/Eno0516/wo-app-ver2/backend/internal/initialize"
)

func main() {
	r := initialize.InitAPI()
	r.Run(":8080")
}
