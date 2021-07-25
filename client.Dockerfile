FROM node:12-alpine AS base
WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Build
FROM base AS build
WORKDIR /app
COPY . .
RUN npm run build:fe

FROM nginx:1.20.0-alpine
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY --from=build /app/dist/apps/client /usr/share/nginx/html
COPY --from=build /app/configs/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/certs /etc/ssl/certs

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
