#--- Build ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

#--- Run ---
FROM nginx:alpine
COPY --from=build /app/dist/achados-perdidos-angular17-bootstrap/browser /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 80