package routes

import (
	"net/http"
	"strconv"

	"github.com/TypicalAM/hackyeah/factory"
	"github.com/TypicalAM/hackyeah/prescription"
	"github.com/TypicalAM/hackyeah/validators"
	"github.com/labstack/echo/v4"
)

type PeselInput struct {
	Pesel string `json:"pesel"`
	Code  int    `json:"code"`
}

type PeselOutput struct {
	Drugs []prescription.Drug `json:"drugs"`
}

func (c *Controller) Pesel(e echo.Context) error {
	var input PeselInput
	if err := e.Bind(&input); err != nil {
		return err
	}

	if valid := validators.Pesel(input.Pesel); !valid {
		return e.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid PESEL number"})
	}

	if valid := validators.PeselCode(input.Code); !valid {
		return e.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid code"})
	}

	api := factory.GetAPI()
	drugs, err := api.GetDrugsForPesel(input.Pesel, strconv.Itoa(input.Code))
	if err != nil {
		return err
	}

	output := BarcodeOutput{
		Drugs: *drugs,
	}

	// input -> output
	return e.JSON(http.StatusOK, output)
}
