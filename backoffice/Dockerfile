FROM node:14 as build-stage

WORKDIR /backoffice

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

ARG BO_APP_API_BASE_URL

ENV BO_APP_API_BASE_URL=$BO_APP_API_BASE_URL

RUN npm run build

FROM nginx:1.17.0-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build-stage /backoffice/build /usr/share/nginx/html

# COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE $BACKOFFICE_DOCKER_PORT

CMD nginx -g "daemon off;"