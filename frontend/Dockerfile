FROM node:18-alpine as build

WORKDIR /app


ENV PATH /app/node_modules/.bin:$PATH

COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node



RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
