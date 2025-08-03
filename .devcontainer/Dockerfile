#docker設定
FROM mcr.microsoft.com/vscode/devcontainers/go:1.24-bullseye AS dev-base
RUN apt-get update \
 && apt-get install -y default-jre-headless docker.io curl git \
 && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y nodejs \
 && npm install -g @openapitools/openapi-generator-cli \
 && npm install @redocly/cli \
 && go install github.com/air-verse/air@latest \
 && ln -s $(go env GOPATH)/bin/air /usr/local/bin/air \
 && rm -rf /var/lib/apt/lists/*

# goの設定
FROM golang:1.24.5 AS backend-builder
WORKDIR /app
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ ./
RUN go build -o server ./cmd/webserver/main.go

# reactの設定
FROM node:20 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Final
FROM dev-base
WORKDIR /app
COPY --from=backend-builder /app/server ./
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist
EXPOSE 3001
CMD ["./server"]