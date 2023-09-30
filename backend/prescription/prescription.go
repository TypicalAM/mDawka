package prescription

import "github.com/TypicalAM/hackyeah/config"

type Drug struct {
	Name         string `json:"drug_name"`
	DaysInterval int    `json:"days_interval"`
	DosesPerDay  int    `json:"doses_per_day"`
	TotalDoses   int    `json:"total_doses"`
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
