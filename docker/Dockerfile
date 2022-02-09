############################################################
# Dockerfile to build&release tKeel console
# Based on node in build stage
# Based on alpine
############################################################
FROM node:14-slim as UI_BUILDER
RUN sed -i "s/deb.debian.org/mirrors.aliyun.com/g" /etc/apt/sources.list \
  && sed -i "s/security.debian.org/mirrors.aliyun.com/g" /etc/apt/sources.list \
  && apt-get clean \
  && apt-get update \
  && apt-get install -qq build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev \
  && npm config set registry https://registry.npm.taobao.org \
  && npm i npm -g \
  && npm i canvas -g

ARG BUILD_ENV=prod
WORKDIR /data/server/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN npm run build:$BUILD_ENV \
  && node sitemap.js

FROM nginx:alpine
COPY --from=UI_BUILDER /data/server/app/out /usr/share/nginx/html
COPY --from=UI_BUILDER /data/server/app/sitemap.xml /data/server/app/official-site.xml  /usr/share/nginx/html/zh-CN/
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
