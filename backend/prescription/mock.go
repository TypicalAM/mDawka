package prescription

import (
	"fmt"
	"log"
)

type MockAPI struct{}

func NewMock() API {
	return MockAPI{}
}

func (api MockAPI) GetDrugsForBarcode(prescriptionID string) (*[]Drug, error) {
	log.Printf("Getting drugs for barcode %s\n", prescriptionID)
	return generateDrugs(), nil
}

func (api MockAPI) GetDrugsForPesel(pesel string, code string) (*[]Drug, error) {
	log.Printf("Getting drugs for pesel %s & code %s\n", pesel, code)
	return generateDrugs(), nil
}

func generateDrugs() *[]Drug {
	var drugs []Drug
	for i := 0; i < 5; i++ {
		drug := Drug{
			Name:        fmt.Sprintf("Lek #%d", i),
			DaysPerWeek: 1,
			DosesPerDay: 1,
			TotalDoses:  10,
		}

		drugs = append(drugs, drug)
	}

	return &drugs
}
