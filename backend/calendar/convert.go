package calendar

import (
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

func Convert(input routes.ConfirmInput) Calendar {
	var events []Event

	for _, drug := range input.Drugs {
		events = append(events, Event{
			UUID:        uuid.New().String(),
			Title:       fmt.Sprintf("Podjedz lek %s", drug.Drug.Name),
			Description: "Weź pigułkę, zobaczysz",
			DateStart:   time.Now(),
			DateEnd:     time.Now().Add(time.Minute * 10),
		})
	}

	return Calendar{
		Events: events,
	}
}
