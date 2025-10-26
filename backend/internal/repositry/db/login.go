package db

import (
	"context"
	"log"

	"github.com/Eno0516/wo-app-ver2/backend/generated/sql"
	"github.com/google/uuid"
)

func (r *DBRepositry) GetLoginUserUUID(arg sql.GetLoginUserParams) uuid.UUID {
	ctx := context.Background()
	db, err := r.q.GetLoginUser(ctx, arg)
	if err != nil {
		log.Fatalln("Login DB Select Failed")
	}
	return db.Uuid
}
