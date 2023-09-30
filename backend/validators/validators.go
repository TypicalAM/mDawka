package validators

import (
	"regexp"
	"strconv"
)

// Pesel validates whether given PESEL is correct.
func Pesel(peselRaw string) bool {
	// Check if the input string has exactly 11 digits
	if match, _ := regexp.MatchString(`^\d{11}$`, peselRaw); !match {
		return false
	}

	// Extract individual digits from the PESEL number
	digits := make([]int, len(peselRaw))
	for i, char := range peselRaw {
		digit, err := strconv.Atoi(string(char))
		if err != nil {
			return false
		}
		digits[i] = digit
	}

	// Validate the PESEL number using the algorithm
	weights := []int{1, 3, 7, 9, 1, 3, 7, 9, 1, 3}
	sum := 0
	for i := 0; i < 10; i++ {
		sum += digits[i] * weights[i]
	}
	checksum := (10 - (sum % 10)) % 10

	// Compare the calculated checksum with the last digit of the PESEL
	lastDigit, _ := strconv.Atoi(string(peselRaw[10]))
	return checksum == lastDigit
}

// PeselCode valides whether given prescription code is correct.
func PeselCode(codeRaw string) bool {
	if len(codeRaw) != 4 {
		return false
	}

	_, err := strconv.Atoi(codeRaw)
	return err == nil
}
