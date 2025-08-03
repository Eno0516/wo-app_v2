FROM golang:1.24.5 AS backend-builder
WORKDIR /app
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend ./
RUN go build -o server ./cmd/webserver/main.go