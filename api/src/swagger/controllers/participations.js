const pagination = require('../generique/pagination')
const {response201, response200, bodyParam, param} = require("../generique/index");

module.exports = {
    "/api/participations/{id}": {
        get: {
          tags: [
            "Participations"
          ],
          "x-swagger-router-controller": "participations",
          operationId: "getParticipationById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getParticipation")
        },
        put: {
          tags: [
            "Participations"
          ],
          "x-swagger-router-controller": "participations",
          operationId: "putParticipation",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Participation","putParticipation")
          ],
          responses: response201("Participation Updated")
        }
    },
}