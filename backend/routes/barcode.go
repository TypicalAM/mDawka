package routes

import (
	"net/http"

	"github.com/TypicalAM/hackyeah/factory"
	"github.com/TypicalAM/hackyeah/prescription"
	"github.com/labstack/echo/v4"
)

type BarcodeInput struct {
	Barcode string `json:"barcode_num"`
}

type BarcodeOutput struct {
	Drugs []prescription.Drug `json:"drugs"`
}

func (c *Controller) Barcode(e echo.Context) error {
	var input BarcodeInput
	if err := e.Bind(&input); err != nil {
		return err
	}

	api := factory.GetAPI()
	drugs, err := api.GetDrugsForBarcode(input.Barcode)
	if err != nil {
		return err
	}

	output := BarcodeOutput{
		Drugs: *drugs,
	}

	return e.JSON(http.StatusOK, output)
}
