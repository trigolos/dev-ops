FROM node:12-alpine AS base
WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Build
FROM base AS build
WORKDIR /app
COPY . .
RUN npm run build:be

# Application release
FROM node:12-alpine AS release
COPY --from=base /app/package*.json ./
RUN npm ci --only=production && npm install pm2 -g && npm cache clean --force
COPY --from=build /app/dist/apps/api ./api

USER node
ENV PORT=8080
EXPOSE 8080

CMD ["pm2-runtime", "api/main.js"]
