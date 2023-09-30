package main

import (
	"embed"
	"fmt"
	"log"

	"github.com/TypicalAM/hackyeah/config"
	"github.com/TypicalAM/hackyeah/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

//go:embed assets/*
var static embed.FS

func main() {
	e := echo.New()
	e.Use(middleware.CORS())

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

	api := e.Group("/api")
	api.POST("/pesel_code", controller.Pesel)
	api.POST("/barcode", controller.Barcode)
	api.POST("/confirm/:uuid", controller.Confirm)
	api.GET("/webcal/:uuid", controller.Webcal)

	e.StaticFS("/assets", echo.MustSubFS(static, "assets"))
	e.FileFS("/favicon.ico", "assets/favicon.ico", static)
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", cfg.Port)))
}
