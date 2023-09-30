package routes

import (
	"context"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

type ConfirmInputDrug struct {
	Name         string   `json:"drug_name"`
	StartDate    string   `json:"start_date"`
	DosesPerWeek string   `json:"doses_per_week"`
	DosesNum     string   `json:"doses_num"`
	Hours        []string `json:"hours"`
}

type ConfirmInput struct {
	UUID  string             `json:"uuid"`
	Drugs []ConfirmInputDrug `json:"drugs"`
}

type ConfirmOutput struct {
	WebcalURL string `json:"webcal_url"`
}

func (c *Controller) Confirm(e echo.Context) error {
	var ci ConfirmInput
	if err := e.Bind(&ci); err != nil {
		return err
	}

	count, err := c.db.Collection("unconfirmed").CountDocuments(context.Background(), bson.M{"uuid": ci.UUID})
	if err != nil {
		return err
	}

	if count == 0 {
		return e.JSON(http.StatusBadRequest, map[string]string{"message": "uuid not found"})
	}

	res, err := c.db.Collection("drugs").InsertOne(e.Request().Context(), bson.M{ci.UUID: ci.Drugs})
	log.Println(res.InsertedID)
	if err != nil {
		return err
	}

	_, err = c.db.Collection("unconfirmed").DeleteOne(e.Request().Context(), bson.M{"uuid": ci.UUID})
	if err != nil {
		return err
	}

	co := ConfirmOutput{WebcalURL: ci.UUID}
	return e.JSON(http.StatusOK, co)
}
