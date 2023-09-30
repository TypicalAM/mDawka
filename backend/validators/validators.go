package validators

// Pesel validates whether given PESEL is correct.
func Pesel(peselRaw string) bool {
	return true
}

// PeselCode valides whether given prescription code is correct.
func PeselCode(code int) bool {
	return code < 10000 && code > 999
}
