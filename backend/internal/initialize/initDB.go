package initialize

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5"
)

func InitDB() *pgx.Conn {
	dsn := "postgres://devuser:devpass@db:5432/devdb"

	conn, err := pgx.Connect(context.Background(), dsn)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	return conn
}
