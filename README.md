# Totoro

Totoro est un service de proximité proposant à ses utilisateurs des missions à réaliser avec des associations en échange de `tokens` dépensables directement dans notre boutique contre des bons de réductions chez des commerçants locaux.

## 🛠 Choix techniques

#### Front

- Typescript (React & ReactNative)
- Atomic Design
- CSS in JS (styled-components)

#### API

- JavaScript (NodeJS )

#### TEST

- Jest (test unitaire)
- Cypress (test e2e)

example:

```code
cd webapp && npm start && npm run cypress
```

## Documentation

// TODO
[Swagger - API](https://linktodocumentation)

## Installation

`create a .env file and copy the config`

- Update project : `sh cmd/update-project.sh` or `.\cmd\update-project.sh`
- Build all project : `sh cmd/build.sh` or `.\cmd\build.sh`
- Build only the api service to work locally : `sh cmd/build.sh --build-local` or `.\cmd\build.sh --build-local`
- Build only the services of your choice : `sh cmd/build.sh --projects="image1;image2;image3..."` or `.\cmd\build.sh --projects="image1;image2;image3..."`
- Update the database if the api structure has changed : `sh cmd/maj-db.sh` or `.\cmd\maj-db.sh`
- Restart services docker : `sh cmd/restart.sh` or `.\cmd\restart.sh` or for example restart deux services `sh cmd/restart.sh api webapp` or `.\cmd\restart.sh api webapp`

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
