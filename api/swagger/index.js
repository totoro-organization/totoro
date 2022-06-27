const fs = require('fs');
var onlyPath = process.cwd();
const controllers = require("./controllers");
const dtoModels = require("./dto.models")

function getObject(params) {
  let object = {}
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      const element = params[key];
      for (const keyFunc in element) {
        if (Object.hasOwnProperty.call(element, keyFunc)) {
          const func = element[keyFunc];
          object[keyFunc] = func()
        }
      }

    }
  }

  return object;
}

const swagger = {
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
  paths: controllers,
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
    ...getObject(dtoModels), 
  }
}
const jsonString = JSON.stringify(swagger, null, 2);
try {
  fs.writeFileSync(onlyPath+'/swagger.json', jsonString);
  console.log('Swagger uploaded');
} catch(err) {
  // An error occurred
  console.error(err);
}