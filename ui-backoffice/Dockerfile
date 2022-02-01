FROM node:14 as build-stage

WORKDIR /ui-backoffice

COPY package.json .

RUN npm install

COPY . .

ARG BO_APP_API_BASE_URL

ENV BO_APP_API_BASE_URL=$BO_APP_API_BASE_URL

RUN npm run build

FROM nginx:1.17.0-alpine

COPY --from=build-stage /ui-backoffice/build /usr/share/nginx/html

EXPOSE $BACKOFFICE_DOCKER_PORT

CMD nginx -g "demon off;"

