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
	if os.Getenv("GO_ENV") != "prod" {
		_ = godotenv.Load(".env.local")
	}
	dsn := os.Getenv("DATABASE_URL")
	log.Printf("GO_ENV=%s, DATABASE_URL length=%d", os.Getenv("GO_ENV"), len(os.Getenv("DATABASE_URL")))
	if dsn == "" {
		log.Fatal("DATABASE_URL is not set")
	}
	conn, err := initialize.InitDB(dsn)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(context.Background())
	fmt.Println("DB connected!!")

	// API Routeの初期化
	r := initialize.InitAPI()

	// Server始動
	errServer := r.Run(":8080")
	if errServer != nil {
		log.Fatalf("Server Error")
	}
}
