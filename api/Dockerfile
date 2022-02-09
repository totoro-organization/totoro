FROM node:14

RUN mkdir -p /usr/src/api

WORKDIR /usr/src/api

COPY . /usr/src/api/

RUN npm install && npm install -g nodemon && npm install -g sequelize-cli

CMD ["npm", "start"]