package routes

import "database/sql"

type Controller struct {
	db *sql.DB
}

func New() *Controller {
	return &Controller{db: nil}
}
