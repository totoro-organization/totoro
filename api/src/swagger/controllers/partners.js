const pagination = require('../generique/pagination');
const {response201, response200, bodyParam, param} = require("../generique/index");

module.exports = {
    "/api/partners": {
        get: {
          tags: [
            "Partners"
          ],
          "x-swagger-router-controller": "partners",
          operationId: "getAllPartners",
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
          responses: response200("getAllPartners")
        },
        post: {
          tags: [
            "Partners"
          ],
          "x-swagger-router-controller": "partners",
          operationId: "postPartner",
          parameters: [
              ...bodyParam("Create Partner", "postPartner")
          ],
          responses: response201("Partner Created")
        }
    },
    "/api/partners/{id}": {
        get: {
          tags: [
            "Partners"
          ],
          "x-swagger-router-controller": "partners",
          operationId: "getPartnerById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getPartner")
        },
        put: {
          tags: [
            "Partners"
          ],
          "x-swagger-router-controller": "partners",
          operationId: "putPartner",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Partner", "putPartner")
          ],
          responses: response201("Partner Updated")
        },
        delete: {
          tags: [
            "Partners"
          ],
          "x-swagger-router-controller": "partners",
          operationId: "deletePartner",
          parameters: param("id","path","string"),
          responses: response201()
        }
    },
    "/api/partners/{id}/discounts": {
        get: {
          tags: [
            "Partners"
          ],
          "x-swagger-router-controller": "partners",
          operationId: "getDiscountsPartnerById",
          parameters: [
            ...param("id","path","string"),
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
          responses: response200("getDiscountsPartner")
        }
    },
    "/api/partners/{id}/transactions": {
        get: {
          tags: [
            "Partners"
          ],
          "x-swagger-router-controller": "partners",
          operationId: "getTransactionsPartnerById",
          parameters: [
            ...param("id","path","string"),
            ...pagination
          ],
          responses: response200("getTransactionsPartner")
        }
    },
    "/api/partners/{id}/logo": {
        put: {
          tags: [
            "Partners"
          ],
          "x-swagger-router-controller": "partners",
          operationId: "putLogoPartner",
          consumes: [
            "multipart/form-data"
          ],
          parameters: [
            ...param("id","path","string"),
            ...param("logo","formData","file",true,"Logo du partenaire"),
          ],
          responses: response201("Partner logo's Updated")
        }
    }
}