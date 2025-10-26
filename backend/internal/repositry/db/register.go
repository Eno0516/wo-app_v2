package db

import (
	"github.com/Eno0516/wo-app-ver2/backend/generated/sql"
)

type DBRepositry struct {
	q *sql.Queries
}

func NewDBRepositry(q *sql.Queries) *DBRepositry {
	return &DBRepositry{q: q}
}
