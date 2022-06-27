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
            }
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getAllLitigations"
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
            "Litigations"
          ],
          "x-swagger-router-controller": "litigations",
          operationId: "postLitigation",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Create Litigation",
              required: true,
              schema: {
                $ref: "#/definitions/postLitigation"
              }
            }
          ],
          responses: {
            201: {
              description: "Litigation Created"
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
    "/api/litigations/{id}": {
        get: {
          tags: [
            "Litigations"
          ],
          "x-swagger-router-controller": "litigations",
          operationId: "getLitigationById",
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
                $ref: "#/definitions/getLitigation"
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
            "Litigations"
          ],
          "x-swagger-router-controller": "litigations",
          operationId: "putLitigation",
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
              description: "Update Litigation",
              required: true,
              schema: {
                $ref: "#/definitions/putLitigation"
              }
            }
          ],
          responses: {
            201: {
              description: "Litigation Updated",
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
            "Litigations"
          ],
          "x-swagger-router-controller": "litigations",
          operationId: "deleteLitigation",
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