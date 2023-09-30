package calendar

import (
	"crypto/md5"
	"encoding/hex"
	"errors"
	"fmt"
	"time"

	"github.com/TypicalAM/hackyeah/routes"
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
		// Validate the input
		if drug.Drug.DaysInterval <= 0 {
			return nil, errors.New("lek nie może mieć ujemnej lub zerowej liczby dni między dawkami")
		}

		if drug.Drug.DosesPerDay <= 0 {
			return nil, errors.New("liczba dawek na dzień nie może być ujemna lub zerowa")
		}

		if len(drug.Hours) != drug.Drug.DosesPerDay {
			return nil, errors.New("liczba godzin nie zgadza się z liczbą dawek na dzień")
		}

		// How many days should the user take drugs?
		dosageDays := int(float64(drug.Drug.TotalDoses)/float64(drug.Drug.DosesPerDay) + 0.5)

		doseNumber := 1
		doseDay, err := time.Parse("2006-01-02", drug.StartDate)
		if err != nil {
			return nil, errors.New("początkowa data przyjmowania leków jest niepoprawna")
		}

		// Iterate over drug intake days
		for dayNumber := 0; dayNumber < dosageDays; dayNumber++ {
			// In a given day, iterate over drug intake hours
			for _, hour := range drug.Hours {
				if doseNumber > drug.Drug.TotalDoses {
					break
				}

				// Combine the drug intake day and hour to a correct time object
				doseTime, err := time.Parse("15:04", hour)
				if err != nil {
					return nil, errors.New("godzina przyjmowania leków jest niepoprawna")
				}

				doseDate := time.Date(
					doseDay.Year(), doseDay.Month(), doseDay.Day(),
					doseTime.Hour(), doseTime.Minute(), 0, 0, doseDay.Location(),
				)

				// Create a calendar Event
				events = append(events, Event{
					UUID:        hash(doseDate, drug.Drug.Name),
					Title:       fmt.Sprintf("%s - dawka #%d/%d", drug.Drug.Name, doseNumber, drug.Drug.TotalDoses),
					Description: "Smacznego!",
					DateStart:   doseDate,
					DateEnd:     doseDate.Add(time.Minute * 10),
				})

				doseNumber += 1
			}

			// Update the drug intake day
			daysUntilNextDose := drug.Drug.DaysInterval
			doseDay = doseDay.Add(time.Hour * time.Duration(24*daysUntilNextDose))
		}

	}

	return &Calendar{
		Events: events,
	}, nil
}

// Generate a hash based on <drug intake time> and <drug name>.
//
// We have to generate calendar Event UUIDs in a deterministic way.
// Otherwise each webcal API call will return different UUIDs,
// which can cause issues in external calendars.
//
// Note: if we switch to storing multiple drugs per each calendar event,
// we should switch to a hash(date time.Time) string interface,
// as each time will only be a single calendar event.
func hash(date time.Time, drugName string) string {
	data := date.String() + drugName

	// Calculate MD5 hash
	hash := md5.Sum([]byte(data))

	// Convert the hash to a hexadecimal string
	hashString := hex.EncodeToString(hash[:])

	return hashString
}
