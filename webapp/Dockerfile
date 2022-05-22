FROM node:14 as build-stage

WORKDIR /webapp

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

ARG WA_APP_API_BASE_URL

ENV WA_APP_API_BASE_URL=$WA_APP_API_BASE_URL

RUN npm run build

FROM nginx:1.17.0-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build-stage /webapp/build /usr/share/nginx/html

# COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE $WEBAPP_DOCKER_PORT

CMD nginx -g "daemon off;"