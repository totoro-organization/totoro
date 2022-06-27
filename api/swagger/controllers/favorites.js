module.exports = {
    "/api/favorites/{id}": {
        delete: {
          tags: [
            "Favorites"
          ],
          "x-swagger-router-controller": "favorites",
          operationId: "deleteFavoriteUser",
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