
FROM node:18-alpine3.16 

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

RUN npm run build
COPY --chown=node:node . .
USER node


