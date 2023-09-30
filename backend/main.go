package main

import (
	"embed"

	"github.com/TypicalAM/hackyeah/routes"
	"github.com/labstack/echo/v4"
)

//go:embed assets/*
var static embed.FS

func main() {
	c := routes.New()
	e := echo.New()

	e.GET("/", c.Hello)
	e.StaticFS("/assets", echo.MustSubFS(static, "assets"))
	e.Logger.Fatal(e.Start(":8080"))
}
