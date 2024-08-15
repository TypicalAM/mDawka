############################
# STEP 1 build & run interactively
############################
FROM golang:alpine

# Install git.
# Git is required for fetching the dependencies.
RUN apk update && apk add --no-cache git

# Set up the workdir
WORKDIR /app

# Fetch dependencies.
COPY go.mod go.sum .
RUN go mod download

# Copy the entrypoint script
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Fetch dev tools (air, gotestsum)
RUN go install github.com/air-verse/air@latest
RUN go install gotest.tools/gotestsum@latest

# Run the Go binary.
ENTRYPOINT ["sh", "/app/entrypoint.sh"]
