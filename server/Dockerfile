FROM --platform=linux/amd64 node:16.17.0

WORKDIR /src/app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 80

CMD ["node", "dist/index.js"]