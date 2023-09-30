package main

import (
	"github.com/TypicalAM/hackyeah/routes"
	"github.com/labstack/echo/v4"
)

func main() {
	c := routes.New()
	e := echo.New()
	e.GET("/", c.Hello)
	e.File("/2137", "assets/rzulta.jpg")
	e.Logger.Fatal(e.Start(":8080"))

	go func() { // yourself
	}()
}
