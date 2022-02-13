FROM nginx:alpine

ARG DIRECTORY_NAME

COPY ./packages/${DIRECTORY_NAME}/dist/ /usr/share/nginx/html/
COPY ./.tmp/test.json /usr/share/nginx/api-json/test.json
COPY ./.tmp/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
