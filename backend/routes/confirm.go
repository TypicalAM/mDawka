package routes

import "github.com/labstack/echo/v4"

type ConfirmInput struct {
	UUID  string `json:"uuid"`
	Drugs []struct {
		Name          string `json:"drug_name"`
		StartDate     string `json:"start_date"`
		WeekFrequency string `json:"week_frequency"`
		DosesNum      string `json:"doses_num"`
	} `json:"drugs"`
}

type ConfirmOutput struct {
	WebcalURL string `json:"webcal_url"`
}

func (c *Controller) Confirm(e echo.Context) error {
	return nil
}
