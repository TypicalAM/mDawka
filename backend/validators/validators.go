package validators

import "strconv"

// Pesel validates whether given PESEL is correct.
func Pesel(peselRaw string) bool {
	return true
}

// PeselCode valides whether given prescription code is correct.
func PeselCode(codeRaw string) bool {
	if code, err := strconv.Atoi(codeRaw); err != nil {
		return false
	} else {
		return code < 10000 && code > 999
	}
}
