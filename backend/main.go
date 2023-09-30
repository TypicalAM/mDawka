package main

import (
	"embed"
	"log"

	"github.com/TypicalAM/hackyeah/config"
	"github.com/TypicalAM/hackyeah/routes"
	"github.com/labstack/echo/v4"
)

//go:embed assets/*
var static embed.FS

func main() {
	e := echo.New()
	cfg, err := config.New()
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Config loaded")

	controller, err := routes.New(cfg)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Controller loaded")

	e.GET("/", controller.Hello)
	e.StaticFS("/assets", echo.MustSubFS(static, "assets"))
	e.FileFS("/favicon.ico", "assets/favicon.ico", static)
	e.Logger.Fatal(e.Start(":8080"))
}
