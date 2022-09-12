FROM node:14 as build-stage

WORKDIR /backoffice

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

ARG API_BASE_URL

ARG APP_ID

ENV REACT_APP_API_BASE_URL=$API_BASE_URL

ENV REACT_APP_APP_ID=$APP_ID

RUN npm run build

FROM nginx:1.17.0-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build-stage /backoffice/build /usr/share/nginx/html

# COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE $GNIX_PORT

CMD nginx -g "daemon off;"