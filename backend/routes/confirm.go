package routes

import (
	"net/http"

	"github.com/TypicalAM/hackyeah/prescription"
	"github.com/labstack/echo/v4"
)

type ConfirmInputDrug struct {
	Drug      prescription.Drug `json:"drug"`
	StartDate string            `json:"start_date"`
	Hours     []string          `json:"hours"`
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
