const fs = require('fs');

const {
  admins,
	applications,
	auth,
	commons,
	discounts,
	favorites,
	jobs,
	litigations,
	organizations,
	partners,
	users,
} = require("./controllers");

const {
  adminsModel,
	applicationsModel,
	authModel,
	commonsModel,
	discountsModel,
	favoritesModel,
	jobsModel,
	litigationsModel,
	organizationsModel,
	partnersModel,
	usersModel,
} = require("./dto.models")

const jsonString = {
  swagger: "2.0",
  info: {
    title: "API",
    description: "Totoro API Information",
    version: "1.0"
  },
  securityDefinitions: {
    ApiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "app_id"
    },
    bearerAuth: {
      name: "Authorization",
      in: "header",
      type: "apiKey",
      description: "JWT Authorization header"
    }
  },
  security: [
    {
      ApiKeyAuth: []
    },
    {
      bearerAuth: []
    }
  ],
  tags: [
    {
      name: "Authentification"
    },
    {
      name: "Users"
    },
    {
      name: "Favorites"
    },
    {
      name: "Admins"
    },
    {
      name: "Litigations"
    },
    {
      name: "Applications"
    },
    {
      name: "Commons"
    }
  ],
  paths: {
     ...admins,
     ...applications,
     ...auth,
     ...commons,
     ...discounts,
     ...favorites,
     ...jobs,
     ...litigations,
     ...organizations,
     ...partners,
     ...users,
  },
  definitions: {
    Error: {
      required: [
        "message"
      ],
      properties: {
        entity: {
          type: "string"
        },
        message: {
          type: "string"
        }
      }
    },
    Success: {
      required: [
        "message"
      ],
      properties: {
        entity: {
          type: "string"
        },
        message: {
          type: "string"
        }
      }
    },
    ...adminsModel,
    ...applicationsModel,
    ...authModel,
    ...commonsModel,
    ...discountsModel,
    ...favoritesModel,
    ...jobsModel,
    ...litigationsModel,
    ...organizationsModel,
    ...partnersModel,
    ...usersModel, 
  }
}

fs.writeFileSync('./../swagger.json', jsonString);