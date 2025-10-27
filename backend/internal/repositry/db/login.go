package db

import (
	"context"
	"log"

	appError "github.com/Eno0516/wo-app-ver2/backend/internal/error"
)

type GetLoginUserRes struct {
	Uuid         string
	PasswordHash string
}

func (r *DBRepositry) GetLoginUser(username string) (GetLoginUserRes, error) {
	ctx := context.Background()
	db, err := r.q.GetLoginUser(ctx, username)
	if err != nil {
		return GetLoginUserRes{}, appError.NewError(404, "invalid user", err)
	}
	log.Println("db", db)
	return GetLoginUserRes{
		Uuid:         db.Username,
		PasswordHash: db.PasswordHash,
	}, nil
}
