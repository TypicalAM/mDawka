package routes

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/TypicalAM/hackyeah/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Controller struct {
	db *mongo.Database
}

func New(cfg *config.Config) (*Controller, error) {
	uri := fmt.Sprintf("mongodb://%s:%s", cfg.DBHost, cfg.DBPort)
	log.Println("Connecting to", uri)
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		return nil, err
	}

	return &Controller{
		db: client.Database("hackyeah"),
	}, nil
}

func (controller *Controller) Close() error {
	return controller.db.Client().Disconnect(context.Background())
}
