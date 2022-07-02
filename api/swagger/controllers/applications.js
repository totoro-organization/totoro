const pagination = require('./../generique/pagination')
const {response201, response200, bodyParam, param} = require("../generique");

module.exports = {
    "/api/applications": {
        get: {
          tags: [
            "Applications"
          ],
          "x-swagger-router-controller": "applications",
          operationId: "getAllApplications",
          parameters: [
            {
              name: "status",
              in: "query",
              type: "string",
              required: false,
              enum: [
                "actived",
                "deleted"
              ]
            },
            ...pagination
          ],
          responses: response200("getAllApplications")
        },
        post: {
          tags: [
            "Applications"
          ],
          "x-swagger-router-controller": "applications",
          operationId: "postApplication",
          parameters: [
            ...bodyParam("Create Application", "postApplication")
          ],
          responses: response201("Application Created")
        }
    },
    "/api/applications/{id}": {
        get: {
          tags: [
            "Applications"
          ],
          "x-swagger-router-controller": "applications",
          operationId: "getApplicationById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getApplication")
        },
        put: {
          tags: [
            "Applications"
          ],
          "x-swagger-router-controller": "applications",
          operationId: "putApplication",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Application","putApplication")
          ],
          responses: response201("Application Updated")
        },
        delete: {
          tags: [
            "Applications"
          ],
          "x-swagger-router-controller": "applications",
          operationId: "deleteApplication",
          parameters: param("id","path","string"),
          responses: response201()
        }
    },
}