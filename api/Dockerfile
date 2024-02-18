
FROM node:20-alpine3.18 

WORKDIR /usr/src/app
ENV NODE_ENV=prod

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build
RUN npx prisma generate

CMD ["npm", "run", "start:prod"]
