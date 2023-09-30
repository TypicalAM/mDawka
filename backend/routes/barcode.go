package routes

import (
	"fmt"
	"net/http"

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

	// todo: process input -> output
	output := BarcodeOutput{
		Drugs: []prescription.Drug{},
	}

	for i := 0; i < 5; i++ {
		drug := prescription.Drug{
			Name:        fmt.Sprintf("Lek #%d", i),
			DaysPerWeek: 1,
			DosesPerDay: 1,
			TotalDoses:  10,
		}

		output.Drugs = append(output.Drugs, drug)
	}

	// input -> output
	return e.JSON(http.StatusOK, output)
}
