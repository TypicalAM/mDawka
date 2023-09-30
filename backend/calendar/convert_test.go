package calendar_test

import (
	"encoding/json"
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
						Name:         "Mefedron",
						DaysInterval: 1,
						DosesPerDay:  2,
						TotalDoses:   10,
					},

					StartDate: "2023-09-30",
					Hours: []string{
						"12:00", "21:37",
					},
				},
			},
		}

		// We test using our eyes
		marszalek, _ := json.MarshalIndent(input, "", "  ")
		t.Logf("%s", marszalek)

		output, _ := calendar.Convert(input)

		pilsudski, _ := json.MarshalIndent(output, "", "  ")
		t.Logf("%s", pilsudski)
	})
}
