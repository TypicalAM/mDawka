package routes

import (
	"log"
	"net/http"

	"github.com/TypicalAM/hackyeah/prescription"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

type BarcodeInput struct {
	Barcode string `json:"barcode_num"`
}

type BarcodeOutput struct {
	UUID  string              `json:"uuid"`
	Drugs []prescription.Drug `json:"drugs"`
}

func (c *Controller) Barcode(e echo.Context) error {
	var input BarcodeInput
	if err := e.Bind(&input); err != nil {
		return err
	}

	drugs, err := c.api.GetDrugsForBarcode(input.Barcode)
	if err != nil {
		return err
	}

	// Insert UUID to unconfirmed collection, we will check it later
	newUUID := uuid.New().String()
	_, err = c.db.Collection("unconfirmed").InsertOne(e.Request().Context(), bson.M{"uuid": newUUID})
	if err != nil {
		return err
	}
	log.Println("Inserted an unconrifmed UUID at", newUUID)

	return e.JSON(http.StatusOK, BarcodeOutput{
		Drugs: *drugs,
		UUID:  newUUID,
	})
}
