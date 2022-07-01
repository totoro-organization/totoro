const pagination = require('../generique/pagination');
const {response201, response200, bodyParam, param} = require("../generique");

module.exports = {
    "/api/subscriptions": {
        get: {
          tags: [
            "Subscriptions"
          ],
          "x-swagger-router-controller": "subscriptions",
          operationId: "getAllSubscriptions",
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
            ...param("current","query", "boolean",false),
            ...pagination
          ],
          responses: response200("getAllSubscriptions")
        },
        post: {
          tags: [
            "Subscriptions"
          ],
          "x-swagger-router-controller": "subscriptions",
          operationId: "postSubscription",
          parameters: bodyParam("Create Subscription", "postSubscription"),
          responses: response201("Subscription Created")
        }
    },
    "/api/subscriptions/{id}": {
        get: {
          tags: [
            "Subscriptions"
          ],
          "x-swagger-router-controller": "subscriptions",
          operationId: "getSubscriptionById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getSubscription")
        },
        put: {
          tags: [
            "Subscriptions"
          ],
          "x-swagger-router-controller": "subscriptions",
          operationId: "putSubscription",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Subscription", "putSubscription")
          ],
          responses: response201("Subscription Updated")
        }
    },
}