# BUILDER IMAGE
FROM node:14.15.4-alpine3.12 AS builder

ENV RELEASE 1.0.0
RUN mkdir -p /app
COPY . /app

WORKDIR /app
RUN yarn
RUN yarn build

# APP IMAGE
FROM node:14.15.4-alpine3.12

WORKDIR /app
COPY --from=builder /app .

RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup
USER nodeuser

ENTRYPOINT ["yarn", "start"]