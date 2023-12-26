
FROM node:18-alpine3.16 

WORKDIR /usr/src/app
ENV NODE_ENV=prod

COPY package*.json ./
RUN npm i
COPY . .

RUN npm run build
RUN npx prisma generate

CMD ["npm", "run", "start:prod"]
