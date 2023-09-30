package routes

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (c *Controller) Webcal(e echo.Context) error {
	return e.String(http.StatusOK, "<tu bedzie kalendarz>")
}
