package factory

import "github.com/TypicalAM/hackyeah/prescription"

func GetAPI() prescription.API {
	return prescription.MockAPI{}
}
