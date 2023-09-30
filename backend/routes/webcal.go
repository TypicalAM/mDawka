package routes

import (
	"bytes"
	"context"
	"log"
	"net/http"

	"github.com/TypicalAM/hackyeah/calendar"
	"github.com/TypicalAM/hackyeah/prescription"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

func (c *Controller) Webcal(e echo.Context) error {
	uuidRaw := e.Param("uuid")
	if uuidRaw == "" {
		return e.JSON(http.StatusBadRequest, map[string]string{"message": "uuid not found"})
	}

	var ci prescription.ConfirmInput
	err := c.db.Collection("drugs").FindOne(context.Background(), bson.M{"_id": uuidRaw}).Decode(&ci)
	if err != nil {
		return err
	}

	result, err := calendar.Convert(ci)
	if err != nil {
		return err
	}

	var buf bytes.Buffer
	result.Serialize(&buf)
	data := buf.String()
	return e.String(http.StatusOK, data)
}
