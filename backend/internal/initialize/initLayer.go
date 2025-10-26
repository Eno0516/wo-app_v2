package initialize

import (
	"database/sql"
	"log"

	sqlc "github.com/Eno0516/wo-app-ver2/backend/generated/sql"
	dbRepo "github.com/Eno0516/wo-app-ver2/backend/internal/repositry/db"
	"github.com/Eno0516/wo-app-ver2/backend/internal/service"
)

func InitLayerConect(dsn string) *service.Service {
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal(err)
	}
	queries := sqlc.New(db)
	repo := dbRepo.NewDBRepositry(queries)
	svc := service.NewService(repo)
	return svc
}
