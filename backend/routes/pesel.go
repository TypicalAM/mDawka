package routes

import "github.com/labstack/echo/v4"

type PeselInput struct {
	Pesel string `json:"pesel"`
	Code  int    `json:"code"`
}

type PeselOutput struct {
	Drugs []struct {
		Name          string `json:"drug_name"`
		WeekFrequency string `json:"week_frequency"`
		DayFrequency  string `json:"day_frequency"`
		DosesNum      string `json:"doses_num"`
	} `json:"drugs"`
}

func (c *Controller) Pesel(e echo.Context) error {
	return nil
}
