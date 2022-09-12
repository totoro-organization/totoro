FROM node:14

RUN mkdir -p /usr/src/app_mobile

WORKDIR /usr/src/app_mobile

COPY . /usr/src/app_mobile/

RUN npm install && npm install -g expo-cli

ARG API_BASE_URL

ARG APP_ID

ENV MOBILEAPP_API_BASE_URL=$API_BASE_URL

ENV MOBILEAPP_APP_ID=$APP_ID

CMD [ "npm", "start" ]

