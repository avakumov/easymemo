FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci 
# RUN npm install serve -g
COPY . .
RUN npm run build

# CMD ["npm", "run", "serve"]

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
