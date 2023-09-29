package routes

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (c *Controller) Hello(e echo.Context) error {
	return e.String(http.StatusOK, "Hello, World!")
}
