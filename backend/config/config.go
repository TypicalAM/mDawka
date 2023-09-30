package config

import (
	"errors"
	"os"
)

type Config struct {
	DBHost string
	DBPort string
}

// New tries to load a config from the environment variables.
func New() (*Config, error) {
	host := os.Getenv("DB_HOST")
	if host == "" {
		return nil, errors.New("DB_HOST not set")
	}

	port := os.Getenv("DB_PORT")
	if port == "" {
		return nil, errors.New("DB_PORT not set")
	}

	return &Config{
		DBHost: host,
		DBPort: port,
	}, nil
}
