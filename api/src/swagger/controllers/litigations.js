const pagination = require('../generique/pagination')
const {response201, response200, bodyParam, param} = require("../generique/index");

module.exports = {
    "/api/litigations": {
        get: {
          tags: [
            "Litigations"
          ],
          "x-swagger-router-controller": "litigations",
          operationId: "getAllLitigations",
          parameters: [
            {
              name: "status",
              in: "query",
              type: "string",
              required: false,
              enum: [
                "closed",
                "deleted"
              ]
            },
            ...pagination
          ],
          responses: response200("getAllLitigations")
        },
        post: {
          tags: [
            "Litigations"
          ],
          "x-swagger-router-controller": "litigations",
          operationId: "postLitigation",
          parameters: [
            ...bodyParam("Create Litigation","postLitigation")
          ],
          responses: response201("Litigation Created")
        }
    },
    "/api/litigations/{id}": {
        get: {
          tags: [
            "Litigations"
          ],
          "x-swagger-router-controller": "litigations",
          operationId: "getLitigationById",
          parameters: [
            ...param("id", "path", "string")
          ],
          responses: response200("getLitigation")
        },
        put: {
          tags: [
            "Litigations"
          ],
          "x-swagger-router-controller": "litigations",
          operationId: "putLitigation",
          parameters: [
            ...param("id", "path", "string"),
            ...bodyParam("Update Litigation", "putLitigation")
          ],
          responses: response201("Litigation Updated")
        },
        delete: {
          tags: [
            "Litigations"
          ],
          "x-swagger-router-controller": "litigations",
          operationId: "deleteLitigation",
          parameters: param("id", "path", "string"),
          responses: response201()
        }
    },
}