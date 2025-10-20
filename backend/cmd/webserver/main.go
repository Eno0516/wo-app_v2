package main

import (
	"context"
	"fmt"
	"log"

	"github.com/Eno0516/wo-app-ver2/backend/internal/initialize"
)

func main() {
	// DBとの接続
	// いったん試しでローカル文字列を与えているが、環境変数に移行する
	dsn := "postgres://devuser:devpass@db:5432/devdb"
	conn, err := initialize.InitDB(dsn)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(context.Background())
	fmt.Println("DB connected!!")
	r := initialize.InitAPI()
	errServer := r.Run(":8080")
	if errServer != nil {
		log.Fatalf("Server Error")
	}
}
