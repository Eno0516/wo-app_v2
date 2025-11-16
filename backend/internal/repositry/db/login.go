package db

import (
	"context"
	"log"

	"github.com/Eno0516/wo-app-ver2/backend/generated/sql"
	appError "github.com/Eno0516/wo-app-ver2/backend/internal/error"
)

type GetLoginUserRes struct {
	UserUUID     string
	GroupUUID    string
	PasswordHash string
}

func (r *DBRepositry) GetLoginUser(userId string, groupId string) (GetLoginUserRes, error) {
	ctx := context.Background()
	db, err := r.q.GetLoginUser(ctx, sql.GetLoginUserParams{
		UserID:  userId,
		GroupID: groupId,
	})
	if err != nil {
		return GetLoginUserRes{}, appError.NewError(404, "invalid user", err)
	}
	log.Println("db", db)
	return GetLoginUserRes{
		UserUUID:     db.UserUuid.String(),
		GroupUUID:    db.GroupUuid.String(),
		PasswordHash: db.PasswordHash,
	}, nil
}
