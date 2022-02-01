FROM node:14 as build-stage-1

WORKDIR /ui-webapp

COPY package.json .

RUN npm install

COPY . .

ARG WA_APP_API_BASE_URL

ENV WA_APP_API_BASE_URL=$WA_APP_API_BASE_URL

RUN npm run build

FROM nginx:1.17.0-alpine

COPY --from=build-stage-1 /ui-webapp/build /usr/share/nginx/html

EXPOSE $BACKOFFICE_DOCKER_PORT

CMD nginx -g "demon off;"