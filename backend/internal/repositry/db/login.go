package db

import (
	"context"
	"log"
)

type GetLoginUserRes struct {
	Uuid         string
	PasswordHash string
}

func (r *DBRepositry) GetLoginUser(username string) GetLoginUserRes {
	ctx := context.Background()
	db, err := r.q.GetLoginUser(ctx, username)
	if err != nil {
		log.Fatalln("Login DB Select Failed")
	}
	return GetLoginUserRes{
		Uuid:         db.Username,
		PasswordHash: db.PasswordHash,
	}
}
