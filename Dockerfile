FROM node:19-alpine AS base
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .

FROM base as production
ENV NODE_ENV=production
RUN npm run build
RUN npm prune

CMD [ "node", "build" ]
