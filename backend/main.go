package main

import (
	"github.com/TypicalAM/hackyeah/routes"
	"github.com/labstack/echo/v4"
)

func main() {
	c := routes.New()
	e := echo.New()
	e.GET("/", c.Hello)
	e.Logger.Fatal(e.Start(":8080"))

	panic("na dobry początek")
}
