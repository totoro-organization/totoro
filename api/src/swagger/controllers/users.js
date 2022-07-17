const pagination = require('../generique/pagination')
const {response201, response200, bodyParam, param} = require("../generique/index");

module.exports = {
    "/api/users": {
        get: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "getAllUsers",
          parameters: [
            {
              name: "status",
              in: "query",
              type: "string",
              required: false,
              enum: [
                "actived",
                "disabled",
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
          responses: response200("getAllUsers")
        }
    },
    "/api/users/{id}": {
        get: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "getUserById",
          parameters: [
            ...param("id", "path", "string")
          ],
          responses: response200("getUser")
        },
        put: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "putUser",
          parameters: [
            ...param("id", "path", "string"),
            ...bodyParam("Update User", "putUser")
          ],
          responses: response201("User Updated")
        },
        delete: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "deleteUser",
          parameters: param("id", "path", "string"),
          responses: response201()
        }
    },
    "/api/users/reset/password": {
      put: {
        tags: [
          "Users"
        ],
        "x-swagger-router-controller": "users",
        operationId: "resetPasswordUser",
        parameters: [
          ...bodyParam("Reset password User", "resetPassword")
        ],
        responses: response201("Password Updated")
      }
    },
    "/api/users/change/password": {
        put: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "changePasswordUser",
          parameters: [
            ...bodyParam("Change password User", "putPasswordAdmin")
          ],
          responses: response201("Password Updated")
        }
    },
    "/api/users/change/avatar": {
        put: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "putAvatarUser",
          consumes: [
            "multipart/form-data"
          ],
          parameters: [
            ...param("avatar","formData","file", true, "avatar for user")
          ],
          responses: response201("Updated Avatar User")
        }
    },
    "/api/users/{id}/favorites": {
        get: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "getFavotitesUser",
          parameters: [
            ...param("id", "path", "string"),
            {
              name: "status",
              in: "query",
              type: "string",
              required: false,
              enum: [
                "actived",
                "disabled",
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
          responses: response200("getFavoritesUser")
        },
        post: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "postFavotitesUser",
          parameters: [
            ...param("id", "path", "string"),
            ...bodyParam("Add Favorite for User", "postFavotitesUser")
          ],
          responses: response201("Favorite added")
        }
    
    },
    "/api/users/{id}/jobs": {
        get: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "getJobsUser",
          parameters: [
            ...param("id", "path", "string"),
            {
              name: "status",
              in: "query",
              type: "string",
              required: false,
              enum: [
                "actived",
                "disabled",
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
          responses: response200("getJobsUser")
        }
    },
    "/api/users/members/:memberId/jobs": {
      get: {
        tags: [
          "Users"
        ],
        "x-swagger-router-controller": "users",
        operationId: "getJobsPublishedUserInOrganization",
        parameters: [
          ...param("memberId", "path", "string"),
          {
            name: "status",
            in: "query",
            type: "string",
            required: false,
            enum: [
              "actived",
              "disabled",
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
        responses: response200("getJobsPublishedByUser")
      }
    },
    "/api/users/{id}/litigations": {
        get: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "getLitigationsUser",
          parameters: [
            ...param("id", "path", "string"),
            {
              name: "status",
              in: "query",
              type: "string",
              required: false,
              enum: [
                "actived",
                "disabled",
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
          responses: response200("getLitigationsUser")
        }
    },
    "/api/users/{id}/transactions": {
      get: {
        tags: [
          "Users"
        ],
        "x-swagger-router-controller": "users",
        operationId: "getTransactionsUser",
        parameters: [
          ...param("id", "path", "string"),
          {
            name: "status",
            in: "query",
            type: "string",
            required: false,
            enum: [
              "actived",
              "disabled",
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
        responses: response200("getTransactionsUser")
      }
    },
}