package routes

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

type BarcodeInput struct {
	Barcode string `json:"barcode_num"`
}

type BarcodeOutputDrug struct {
	Name        string `json:"drug_name"`
	DaysPerWeek int    `json:"days_per_week"`
	DosesPerDay int    `json:"doses_per_day"`
	TotalDoses  int    `json:"total_doses"`
}

type BarcodeOutput struct {
	Drugs []BarcodeOutputDrug `json:"drugs"`
}

func (c *Controller) Barcode(e echo.Context) error {
	var input BarcodeInput
	if err := e.Bind(&input); err != nil {
		return err
	}

	// todo: process input -> output
	output := BarcodeOutput{
		Drugs: []BarcodeOutputDrug{},
	}

	for i := 0; i < 5; i++ {
		drug := BarcodeOutputDrug{
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
