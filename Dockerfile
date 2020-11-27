FROM node:14.13

WORKDIR /usr/src/app

COPY package*.json ./

COPY webpack.config.js ./

COPY tsconfig.json ./

COPY globals.d.ts ./

COPY server.js ./

COPY src ./src

RUN npm install

RUN npm run build

EXPOSE 8080

CMD [ "node", "server.js" ]