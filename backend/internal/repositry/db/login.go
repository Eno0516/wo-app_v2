package db

import (
	"context"
	"fmt"
)

type GetLoginUserRes struct {
	Uuid         string
	PasswordHash string
}

func (r *DBRepositry) GetLoginUser(username string) GetLoginUserRes {
	ctx := context.Background()
	db, err := r.q.GetLoginUser(ctx, username)
	if err != nil {
		fmt.Errorf("Login DB Select Failed", err)
	}
	return GetLoginUserRes{
		Uuid:         db.Username,
		PasswordHash: db.PasswordHash,
	}
}
