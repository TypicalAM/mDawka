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

func Convert(input routes.ConfirmInput) (*Calendar, error) {
	var events []Event

	for _, drug := range input.Drugs {
		if drug.Drug.DaysInterval <= 0 {
			return nil, errors.New("co uczyniłeś, błaźnie?")
		}

		if len(drug.Hours) != drug.Drug.DosesPerDay {
			return nil, errors.New("co uczyniłeś, błaźnie?")
		}

		// How many days should the user take drugs?
		dosageDays := int(float64(drug.Drug.TotalDoses)/float64(drug.Drug.DosesPerDay) + 0.5)

		doseNumber := 1
		// todo: error handling
		doseDay, _ := time.Parse("2006-01-02", drug.StartDate)
		for dayNumber := 0; dayNumber < dosageDays; dayNumber++ {
			for _, hour := range drug.Hours {
				if doseNumber > drug.Drug.TotalDoses {
					break
				}

				// todo: error handling
				doseTime, _ := time.Parse("15:04", hour)

				doseDate := time.Date(
					doseDay.Year(), doseDay.Month(), doseDay.Day(),
					doseTime.Hour(), doseTime.Minute(), 0, 0, doseDay.Location(),
				)

				// todo: powtarzalne uuid aby nie sypalo sie przy zmianach
				events = append(events, Event{
					UUID:        uuid.New().String(),
					Title:       fmt.Sprintf("%s - dawka #%d/%d", drug.Drug.Name, doseNumber, drug.Drug.TotalDoses),
					Description: "Smacznego!",
					DateStart:   doseDate,
					DateEnd:     doseDate.Add(time.Minute * 10),
				})

				doseNumber += 1
			}

			daysUntilNextDose := drug.Drug.DaysInterval
			doseDay = doseDay.Add(time.Hour * time.Duration(24*daysUntilNextDose))
		}

	}

	return &Calendar{
		Events: events,
	}, nil
}
