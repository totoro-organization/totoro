FROM node:14

RUN mkdir -p /usr/src/app_mobile

WORKDIR /usr/src/app_mobile

COPY . /usr/src/app_mobile/

RUN npm install && npm install -g expo-cli

ARG API_BASE_URL

ENV API_BASE_URL=$API_BASE_URL

CMD [ "npm", "start" ]

