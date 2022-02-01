FROM node:14

WORKDIR /api

COPY package.json .

RUN npm install

COPY . .

CMD ["nodemon", "start"]