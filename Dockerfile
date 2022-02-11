FROM node:16-slim as BUILDER

RUN apt clean \
  && apt update \
  && yarn set version stable \
  && npm install -g cross-env

ARG PACKAGE_NAME

WORKDIR /app
COPY ./ ./
RUN yarn \
  && yarn workspace ${PACKAGE_NAME} build
