FROM node:16-slim as BUILDER

RUN apt clean \
  && apt update \
  && yarn set version stable

ARG PACKAGE_NAME

WORKDIR /app
COPY ./ ./
RUN echo ${PACKAGE_NAME}
RUN yarn
RUN yarn workspace ${PACKAGE_NAME} build
