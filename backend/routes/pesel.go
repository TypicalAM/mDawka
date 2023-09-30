package routes

import (
	"net/http"

	"github.com/TypicalAM/hackyeah/validators"
	"github.com/labstack/echo/v4"
)

type PeselInput struct {
	Pesel string `json:"pesel"`
	Code  int    `json:"code"`
}

type PeselOutputDrug struct {
	Name        string `json:"drug_name"`
	DaysPerWeek int    `json:"days_per_week"`
	DosesPerDay int    `json:"doses_per_day"`
	DosesNum    int    `json:"doses_num"`
}

type PeselOutput struct {
	Drugs []PeselOutputDrug `json:"drugs"`
}

func (c *Controller) Pesel(e echo.Context) error {
	var pi PeselInput
	if err := e.Bind(&pi); err != nil {
		return err
	}

	if valid := validators.Pesel(pi.Pesel); !valid {
		return e.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid PESEL number"})
	}

	if valid := validators.PeselCode(pi.Code); !valid {
		return e.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid code"})
	}

	// TODO: Call external API
	return e.JSON(http.StatusOK, map[string]string{"test": "test"})
}
