FROM node:18-alpine as build

WORKDIR /app


ENV PATH /app/node_modules/.bin:$PATH

COPY --chown=node:node package*.json ./
RUN npm ci
RUN npm install serve -g
COPY --chown=node:node . .
RUN npm run build
USER node

