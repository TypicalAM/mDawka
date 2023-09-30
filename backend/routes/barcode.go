package routes

import "github.com/labstack/echo/v4"

type BarcodeInput struct {
	Barcode string `json:"barcode_num"`
}

type BarcodeOutput struct {
	Drugs []struct {
		Name          string `json:"drug_name"`
		WeekFrequency string `json:"week_frequency"`
		DayFrequency  string `json:"day_frequency"`
		DosesNum      string `json:"doses_num"`
	} `json:"drugs"`
}

func (c *Controller) Barcode(e echo.Context) error {
	return nil
}
