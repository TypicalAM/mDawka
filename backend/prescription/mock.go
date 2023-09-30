package prescription

import (
	"log"
	"math/rand"
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
	drugsNumber := rand.Intn(3) + 2
	drugNames := []string{
		"Amoksycylina 500mg",
		"Gripex 200mg",
		"Ibum 400mg",
		"Omeprazol 20mg",
		"Loratadyna 10mg",
		"Ciprofloksacyna 500mg",
	}

	rand.Shuffle(len(drugNames), func(i, j int) { drugNames[i], drugNames[j] = drugNames[j], drugNames[i] })

	var drugs []Drug
	for i := 0; i < drugsNumber; i++ {
		drug := Drug{
			Name:         drugNames[i],
			DaysInterval: 1,
			DosesPerDay:  rand.Intn(3) + 1,
			TotalDoses:   rand.Intn(15) + 1,
		}

		drugs = append(drugs, drug)
	}

	return &drugs
}
