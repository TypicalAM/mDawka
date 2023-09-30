package prescription

import "github.com/TypicalAM/hackyeah/config"

type Drug struct {
	Name         string `json:"drug_name" required:"true"`
	DaysInterval int    `json:"days_interval" required:"true"`
	DosesPerDay  int    `json:"doses_per_day" required:"true"`
	TotalDoses   int    `json:"total_doses" required:"true"`
}

type API interface {
	GetDrugsForBarcode(prescriptionID string) (*[]Drug, error)
	GetDrugsForPesel(pesel string, code string) (*[]Drug, error)
}

func New(cfg *config.Config) API {
	if cfg.Debug {
		return NewMock()
	}

	return nil // TODO: Real API
}

type ConfirmInputDrug struct {
	Drug      Drug     `json:"drug" required:"true"`
	StartDate string   `json:"start_date" required:"true"`
	Hours     []string `json:"hours" required:"true"`
}

type ConfirmInput struct {
	Drugs []ConfirmInputDrug `json:"drugs" required:"true"`
}
