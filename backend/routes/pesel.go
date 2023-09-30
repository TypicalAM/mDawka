package routes

import (
	"fmt"
	"net/http"

	"github.com/TypicalAM/hackyeah/prescription"
	"github.com/TypicalAM/hackyeah/validators"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type PeselInput struct {
	Pesel string `json:"pesel"`
	Code  int    `json:"code"`
}

type PeselOutput struct {
	UUID  string              `json:"uuid"`
	Drugs []prescription.Drug `json:"drugs"`
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

	drugs, err := c.prepository.GetDrugsForPesel(pi.Pesel, fmt.Sprint(pi.Code)) //TODO: Code should be int?
	if err != nil {
		return err
	}

	return e.JSON(http.StatusOK, PeselOutput{
		Drugs: *drugs,
		UUID:  uuid.New().String(),
	})
}
