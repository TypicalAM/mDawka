package prescription

type Drug struct {
	Name        string `json:"drug_name"`
	DaysPerWeek int    `json:"days_per_week"`
	DosesPerDay int    `json:"doses_per_day"`
	TotalDoses  int    `json:"total_doses"`
}

type API interface {
	GetDrugsForBarcode(prescriptionID string) (*[]Drug, error)
	GetDrugsForPesel(pesel string, code string) (*[]Drug, error)
}
