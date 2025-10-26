package initialize

import (
	"database/sql"
	"fmt"
	"log"

	sqlc "github.com/Eno0516/wo-app-ver2/backend/generated/sql"
	dbRepo "github.com/Eno0516/wo-app-ver2/backend/internal/repositry/db"
	"github.com/Eno0516/wo-app-ver2/backend/internal/service"
	_ "github.com/lib/pq"
)

func InitLayerConect(dsn string) *service.Service {
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal(err)
	}
	queries := sqlc.New(db)
	fmt.Println("queries", queries)
	repo := dbRepo.NewDBRepositry(queries)
	fmt.Println("repo", repo)
	svc := service.NewService(repo)
	fmt.Println("svc", svc)
	return svc
}
