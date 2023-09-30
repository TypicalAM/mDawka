package routes

import (
	"net/http"

	"github.com/TypicalAM/hackyeah/prescription"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type BarcodeInput struct {
	Barcode string `json:"barcode_num"`
}

type BarcodeOutput struct {
	UUID  string              `json:"uuid"`
	Drugs []prescription.Drug `json:"drugs"`
}

func (c *Controller) Barcode(e echo.Context) error {
	var bi BarcodeInput
	if err := e.Bind(&bi); err != nil {
		return err
	}

	drugs, err := c.prepository.GetDrugsForBarcode(bi.Barcode)
	if err != nil {
		return err
	}

	return e.JSON(http.StatusOK, BarcodeOutput{
		Drugs: *drugs,
		UUID:  uuid.New().String(),
	})
}
