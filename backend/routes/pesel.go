package routes

import (
	"log"
	"net/http"

	"github.com/TypicalAM/hackyeah/prescription"
	"github.com/TypicalAM/hackyeah/validators"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

type PeselInput struct {
	Pesel string `json:"pesel"`
	Code  string `json:"code"`
}

type PeselOutput struct {
	UUID  string              `json:"uuid"`
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

	drugs, err := c.api.GetDrugsForPesel(input.Pesel, input.Code)
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

	return e.JSON(http.StatusOK, PeselOutput{
		Drugs: *drugs,
		UUID:  newUUID,
	})
}
