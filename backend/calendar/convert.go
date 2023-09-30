package calendar

import (
	"errors"
	"fmt"
	"time"

	"github.com/TypicalAM/hackyeah/routes"
	"github.com/google/uuid"
)

type Event struct {
	UUID        string
	Title       string
	Description string
	DateStart   time.Time
	DateEnd     time.Time
}
type Calendar struct {
	Events []Event
}

// todo: powtarzalne uuid aby nie sypalo sie przy zmianach

func Convert(input routes.ConfirmInput) (*Calendar, error) {
	var events []Event

	for _, drug := range input.Drugs {
		if drug.Drug.DaysInterval <= 0 {
			return nil, errors.New("Co uczyniłeś, błaźnie?")
		}

		// How many days should the user take drugs?
		/*dosageDays := int(float64(drug.Drug.TotalDoses)/float64(drug.Drug.DaysPerWeek) + 0.5)

		doseDay := 0
		for doseNumber := 0; doseNumber < drug.Drug.TotalDoses; doseNumber++ {
			daysUntilNextDose := weeklyDosesToDayIntervals[drug.Drug.DaysPerWeek]
		}*/

		events = append(events, Event{
			UUID:        uuid.New().String(),
			Title:       fmt.Sprintf("Podjedz lek %s", drug.Drug.Name),
			Description: "Weź pigułkę, zobaczysz",
			DateStart:   time.Now(),
			DateEnd:     time.Now().Add(time.Minute * 10),
		})
	}

	return &Calendar{
		Events: events,
	}, nil
}
