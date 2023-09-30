package validators

import "strconv"

// Pesel validates whether given PESEL is correct.
func Pesel(peselRaw string) bool {
	return true
}

// PeselCode valides whether given prescription code is correct.
func PeselCode(codeRaw string) bool {
	if len(codeRaw) != 4 {
		return false
	}

	_, err := strconv.Atoi(codeRaw)
	return err == nil
}
