# Totoro

Totoro est un service de proximité proposant à ses utilisateurs des missions à réaliser avec des associations en échange de `tokens` dépensables directement dans notre boutique contre des bons de réductions chez des commerçants locaux.

## 🛠 Choix techniques

#### Front

- Typescript (React & ReactNative)
- Atomic Design
- CSS in JS (styled-components)

#### API

- JavaScript (NodeJS)

#### TEST

- Jest (test unitaire)
- Cypress (test e2e)

## Documentation

// TODO
[Swagger - API](https://linktodocumentation)

## Installation

`create a .env file and copy the config`

- Build all project : `sh build.sh` ou `.\build.sh`
- Build only the api service to work locally : `sh build.sh --build-local` or `.\build.sh --build-local`
- Build only the services of your choice : `sh build.sh --projects="image1;image2;image3..."` or `.\build.sh --projects="image1;image2;image3..."`

## ip infra

- api : http://localhost:6868
- swagger : http://localhost:6868/docs
- ui-backoffice : http://localhost:3002
- landingpage : http://localhost:5555
- mobileapp : http://127.0.0.1:19002
- webapp : http://localhost:3000
- phpmyadmin: http://localhost:8888


## deployment

`sh deploy.sh "folder app" "your message commit"`
