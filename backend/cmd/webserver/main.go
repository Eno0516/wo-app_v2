package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/Eno0516/wo-app-ver2/backend/internal/initialize"
	"github.com/joho/godotenv"
)

func main() {
	// DBとの接続
	// ローカル環境でのみ.envをロード
	_ = godotenv.Load(".env.local")
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL is not set")
	}
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
