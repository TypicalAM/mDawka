package routes

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type ConfirmInputDrug struct {
	Name         string `json:"drug_name"`
	StartDate    string `json:"start_date"`
	DosesPerWeek string `json:"doses_per_week"`
	DosesNum     string `json:"doses_num"`
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

	// TODO: Confirm with db
	return e.JSON(http.StatusOK, ConfirmInput{})
}
