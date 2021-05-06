FROM node:12-alpine AS build
WORKDIR /app
COPY ../ .
RUN npm ci && npm run build:be && npm cache clean --force && npm install pm2 -g

USER node
EXPOSE 8080

CMD ["pm2-runtime", "dist/apps/api/main.js"]
