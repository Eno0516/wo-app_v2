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

# Final
FROM dev-base
WORKDIR /app
EXPOSE 3001
CMD ["./server"]