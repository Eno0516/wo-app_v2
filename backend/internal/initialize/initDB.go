package initialize

import (
	"context"

	"github.com/jackc/pgx/v5"
)

func InitDB(dsn string) (*pgx.Conn, error) {
	// DBとの接続
	conn, err := pgx.Connect(context.Background(), dsn)
	if err != nil {
		return nil, err
	}
	if err := conn.Ping(context.Background()); err != nil {
		return nil, err
	}
	return conn, nil
}
