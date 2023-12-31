package routes

import (
	"bytes"
	"context"
	"net/http"

	"github.com/TypicalAM/hackyeah/calendar"
	"github.com/TypicalAM/hackyeah/prescription"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

// Webcal(e echo.Context) handles iCal providing functionality.
// It returns repsonse with "Content-Type" set to text/calendar
func (c *Controller) Webcal(e echo.Context) error {
	uuidRaw := e.Param("uuid")
	if uuidRaw == "" {
		return e.JSON(http.StatusBadRequest, map[string]string{"message": "uuid not found"})
	}

	var ci prescription.ConfirmInput
	err := c.db.Collection("drugs").FindOne(context.Background(), bson.M{"_id": uuidRaw}).Decode(&ci)
	if err != nil {
		return e.JSON(http.StatusBadRequest, map[string]string{"message": "uuid not found in db"})
	}

	result, err := calendar.Convert(ci)
	if err != nil {
		return e.JSON(http.StatusBadRequest, map[string]string{"message": "error while converting"})
	}

	var buf bytes.Buffer
	result.Serialize(&buf)
	data := buf.String()

	e.Response().Header().Set("Content-Type", "text/calendar")
	e.Response().Header().Set("Content-Disposition", "attachment; filename=kalendarz_dawkowania.ics")

	return e.String(http.StatusOK, data)
}
