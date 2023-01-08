FROM node:18.13.0-alpine3.17 as base

#
# Dependency skeleton
#
FROM base as deps-skeleton
WORKDIR /app

COPY package.json yarn.lock ./

#
# Production deps
#
FROM deps-skeleton as proddeps
WORKDIR /app

ENV NODE_ENV=production

RUN yarn --frozen-lockfile --production=true

#
# Development deps
#
FROM proddeps as devdeps
WORKDIR /app

ENV NODE_ENV=development
RUN yarn --frozen-lockfile --production=false

#
# Build
#
FROM devdeps as build
WORKDIR /app

ENV NODE_ENV=development
RUN yarn build

#
# Test
#
FROM devdeps as test
WORKDIR /app

ENV NODE_ENV=test
RUN yarn test

#
# Run
#
FROM base as runtime
WORKDIR /app

COPY --from=devdeps /app/node_modules ./
COPY --from=build /app/dist ./

CMD ["node", "index.js"]
