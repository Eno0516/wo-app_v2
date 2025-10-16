#docker設定
FROM mcr.microsoft.com/devcontainers/go:1.25 AS dev-base
RUN apt-get update --fix-missing \
 && apt-get install -y default-jre-headless curl git \
 && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y nodejs \
 && npm install -g @openapitools/openapi-generator-cli \
 && npm install -g @redocly/cli \
 && go install github.com/air-verse/air@latest \
 && ln -s $(go env GOPATH)/bin/air /usr/local/bin/air \
 && rm -rf /var/lib/apt/lists/*

 WORKDIR /app
 COPY backend/go.mod backend/go.sum ./
 RUN go mod download

# Final
FROM dev-base
WORKDIR /app
EXPOSE 3001
CMD ["sleep","infinity"]