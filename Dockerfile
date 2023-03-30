FROM node:19-alpine AS base
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .

FROM base as development
ENV NODE_ENV=development
EXPOSE 5173
CMD [ "npm", "run", "dev" ]

FROM base as production
ENV NODE_ENV=production
RUN npm run build
RUN npm prune

CMD [ "node", "build" ]
