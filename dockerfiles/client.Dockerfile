FROM node:12-alpine AS build
WORKDIR /app
COPY ../ .
RUN npm ci && npm run build:fe && npm cache clean --force

FROM nginx:1.20.0-alpine
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY --from=build /app/dist/apps/client /usr/share/nginx/html
COPY --from=build /app/configs/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/certs /etc/ssl/certs

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
