package calendar_test

import (
	"testing"

	"github.com/TypicalAM/hackyeah/calendar"
	"github.com/TypicalAM/hackyeah/prescription"
	"github.com/TypicalAM/hackyeah/routes"
	"github.com/google/uuid"
)

func TestConvert(t *testing.T) {
	t.Run("test basic example", func(t *testing.T) {
		input := routes.ConfirmInput{
			UUID: uuid.New().String(),
			Drugs: []routes.ConfirmInputDrug{
				{
					Drug: prescription.Drug{
						Name:         "Nazwa",
						DaysInterval: 1,
						DosesPerDay:  1,
						TotalDoses:   10,
					},

					StartDate: "2023-09-30",
					Hours: []string{
						"12:40",
					},
				},
			},
		}

		// We test using our eyes
		t.Logf("%#v", input)

		output, _ := calendar.Convert(input)

		t.Logf("%#v", output)
	})
}
