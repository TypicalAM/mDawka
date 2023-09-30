package config

import (
	"errors"
	"os"
)

type Config struct {
	Port   string
	DBHost string
	DBPort string
}

// New tries to load a config from the environment variables.
func New() (*Config, error) {
	host := os.Getenv("DB_HOST")
	if host == "" {
		return nil, errors.New("DB_HOST not set")
	}

	dbPort := os.Getenv("DB_PORT")
	if dbPort == "" {
		return nil, errors.New("DB_PORT not set")
	}

	port := os.Getenv("PORT")
	if port == "" {
		return nil, errors.New("PORT not set")
	}

	return &Config{
		Port:   port,
		DBHost: host,
		DBPort: dbPort,
	}, nil
}
