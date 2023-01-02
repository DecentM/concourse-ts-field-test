FROM node:18.12-alpine3.16 as base

FROM base as build

WORKDIR /app

COPY . .

RUN yarn --frozen-lockfile
RUN yarn build

FROM base as runtime

WORKDIR /app

COPY --from=build /app/dist /app

ENTRYPOINT [ "node", "/app/index.js" ]
