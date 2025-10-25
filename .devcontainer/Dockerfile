#docker設定
FROM mcr.microsoft.com/devcontainers/go:1.25 AS dev-base
RUN apt-get update --fix-missing \
 && apt-get install -y default-jre-headless curl git \
 && apt-get install -y postgresql-client \
 && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y nodejs \
 && npm install -g @openapitools/openapi-generator-cli \
 && npm install -g @redocly/cli \
 && go install github.com/air-verse/air@latest \
 && go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest \
 && ln -s $(go env GOPATH)/bin/air /usr/local/bin/air \
 && rm -rf /var/lib/apt/lists/*

RUN curl -L https://github.com/golang-migrate/migrate/releases/download/v4.17.0/migrate.linux-amd64.tar.gz \
  | tar -xz -C /usr/local/bin 

WORKDIR /app
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Final
FROM dev-base
WORKDIR /app
EXPOSE 3001
CMD ["sleep","infinity"]