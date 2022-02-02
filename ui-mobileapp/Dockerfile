FROM node:14

COPY . /home/

WORKDIR /home

RUN npm install && npm install -g expo-cli

ARG APPM_APP_API_BASE_URL

ENV APPM_APP_API_BASE_URL=$APPM_APP_API_BASE_URL

CMD [ "npm", "start" ]

