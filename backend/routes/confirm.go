package routes

import (
	"context"
	"log"
	"net/http"

	"github.com/TypicalAM/hackyeah/prescription"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

type ConfirmOutput struct {
	WebcalURL string `json:"webcal_url"`
}

func (c *Controller) Confirm(e echo.Context) error {
	uuidRaw := e.Param("uuid")
	if uuidRaw == "" {
		return e.JSON(http.StatusBadRequest, map[string]string{"message": "uuid not provided"})
	}

	var ci prescription.ConfirmInput
	if err := e.Bind(&ci); err != nil {
		return err
	}

	count, err := c.db.Collection("unconfirmed").CountDocuments(context.Background(), bson.M{"uuid": uuidRaw})
	if err != nil {
		return err
	}

	if count == 0 {
		return e.JSON(http.StatusBadRequest, map[string]string{"message": "uuid not found"})
	}

	log.Printf("%+v\n", ci.Drugs)
	res, err := c.db.Collection("drugs").InsertOne(e.Request().Context(), bson.M{
		"_id":   uuidRaw,
		"uuid":  uuidRaw,
		"drugs": ci.Drugs,
	})
	if err != nil {
		return err
	}
	log.Println(res.InsertedID)

	_, err = c.db.Collection("unconfirmed").DeleteOne(e.Request().Context(), bson.M{"uuid": uuidRaw})
	if err != nil {
		return err
	}

	return e.JSON(http.StatusCreated, map[string]string{"message": "Created successfully"})
}
