const {response201, param} = require("../generique/index");

module.exports = {
    "/api/favorites/{id}": {
        delete: {
          tags: [
            "Favorites"
          ],
          "x-swagger-router-controller": "favorites",
          operationId: "deleteFavoriteUser",
          parameters: [
            ...param("id", "path", "string")
          ],
          responses: response201()
        }
    },
}