const pagination = require('../generique/pagination');
const {response201, response200, bodyParam, param} = require("../generique/index");

module.exports = {
    "/api/transactions": {
        get: {
          tags: [
            "Transactions"
          ],
          "x-swagger-router-controller": "transactions",
          operationId: "getAllTransactions",
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
            {
              name: "order",
              in: "query",
              type: "string",
              required: false,
              enum: [
                "ASC",
                "DESC"
              ]
            },
            ...pagination
          ],
          responses: response200("getAllTransactions")
        },
        post: {
          tags: [
            "Transactions"
          ],
          "x-swagger-router-controller": "transactions",
          operationId: "postTransaction",
          parameters: [
            ...bodyParam("Create Transaction","postTransaction")
          ],
          responses: response201("Transaction Created")
        }
    },
    "/api/transactions/{id}": {
        get: {
          tags: [
            "Transactions"
          ],
          "x-swagger-router-controller": "transactions",
          operationId: "getTransactionById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getTransaction")
        },
        put: {
          tags: [
            "Transactions"
          ],
          "x-swagger-router-controller": "transactions",
          operationId: "putTransaction",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Transaction", "putTransaction")
          ],
          responses: response201("Transaction Updated")
        }
    },
    "/api/transactions/verify/{code}": {
        get: {
          tags: [
            "Transactions"
          ],
          "x-swagger-router-controller": "transactions",
          operationId: "getTransactionByCode",
          parameters: [
            ...param("code","path","string")
          ],
          responses: response200("getTransaction")
        }
    }
}