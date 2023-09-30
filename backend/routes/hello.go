package routes

import (
	"context"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

func (c *Controller) Hello(e echo.Context) error {
	c.db.Collection("users").InsertOne(context.Background(), map[int]string{
		1: "dupka",
		2: "dupka2",
		3: "dupka3",
	})

	var result bson.M
	err := c.db.Collection("users").FindOne(context.Background(), bson.M{}).Decode(&result)
	if err != nil {
		log.Println("DIDNT FIND USER, DAMN")
		return err
	}

	log.Println(result)
	return e.String(http.StatusOK, "HELO")
}
