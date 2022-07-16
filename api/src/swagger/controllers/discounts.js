const pagination = require('../generique/pagination');
const {response201, response200, bodyParam, param} = require("../generique/index");

module.exports = {
    "/api/discounts": {
        get: {
          tags: [
            "Discounts"
          ],
          "x-swagger-router-controller": "discounts",
          operationId: "getAllDiscounts",
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
          responses: response200("getAllDiscounts")
        },
        post: {
          tags: [
            "Discounts"
          ],
          "x-swagger-router-controller": "discounts",
          operationId: "postDiscount",
          parameters: bodyParam("Create Discount", "postDiscount"),
          responses: response201("Discount Created")
        }
    },
    "/api/discounts/{id}": {
        get: {
          tags: [
            "Discounts"
          ],
          "x-swagger-router-controller": "discounts",
          operationId: "getDiscountById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getDiscount")
        },
        put: {
          tags: [
            "Discounts"
          ],
          "x-swagger-router-controller": "discounts",
          operationId: "putDiscount",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Discount", "putDiscount")
          ],
          responses: response201("Discount Updated")
        },
        delete: {
          tags: [
            "Discounts"
          ],
          "x-swagger-router-controller": "discounts",
          operationId: "deleteDiscount",
          parameters: param("id","path","string"),
          responses: response201()
        }
    },
}