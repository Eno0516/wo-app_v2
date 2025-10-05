FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y tini

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["npm", "run", "dev"]
EXPOSE 5173