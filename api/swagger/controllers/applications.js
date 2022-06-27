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
            }
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getAllApplications"
              }
            },
            default: {
              description: "Unexpected error",
              schema: {
                $ref: "#/definitions/Error"
              }
            }
          }
        },
        post: {
          tags: [
            "Applications"
          ],
          "x-swagger-router-controller": "applications",
          operationId: "postApplication",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Create Application",
              required: true,
              schema: {
                $ref: "#/definitions/postApplication"
              }
            }
          ],
          responses: {
            201: {
              description: "Application Created",
              schema: {
                $ref: "#/definitions/Success"
              }
            },
            default: {
              description: "Unexpected error",
              schema: {
                $ref: "#/definitions/Error"
              }
            }
          }
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
            {
              name: "id",
              in: "path",
              type: "string",
              required: true
            }
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getApplication"
              }
            },
            default: {
              description: "Unexpected error",
              schema: {
                $ref: "#/definitions/Error"
              }
            }
          }
        },
        put: {
          tags: [
            "Applications"
          ],
          "x-swagger-router-controller": "applications",
          operationId: "putApplication",
          parameters: [
            {
              name: "id",
              in: "path",
              type: "string",
              required: true
            },
            {
              name: "data",
              in: "body",
              description: "Update Application",
              required: true,
              schema: {
                $ref: "#/definitions/putApplication"
              }
            }
          ],
          responses: {
            201: {
              description: "Application Updated",
              schema: {
                $ref: "#/definitions/Success"
              }
            },
            default: {
              description: "Unexpected error",
              schema: {
                $ref: "#/definitions/Error"
              }
            }
          }
        },
        delete: {
          tags: [
            "Applications"
          ],
          "x-swagger-router-controller": "applications",
          operationId: "deleteApplication",
          parameters: [
            {
              name: "id",
              in: "path",
              type: "string",
              required: true
            }
          ],
          responses: {
            201: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/Success"
              }
            },
            default: {
              description: "Unexpected error",
              schema: {
                $ref: "#/definitions/Error"
              }
            }
          }
        }
    },
}