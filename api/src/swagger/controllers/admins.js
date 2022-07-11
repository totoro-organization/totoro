const pagination = require('../generique/pagination')
const {response201, response200, bodyParam, param} = require("../generique/index");

module.exports = {
    "/api/admins": {
        get: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "getAllAdmins",
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
              name: "role",
              in: "query",
              type: "string",
              required: false,
              enum: [
                "Moderateur",
                "Administrateur",
                "Comptable"
              ]
            },
            ...pagination
          ],
          responses: response200("getAllAdmins")
        },
        post: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "postAdmin",
          parameters: [
            ...bodyParam("Create Admin","postAdmin")
          ],
          responses: response201("Admin Created")
        }
    },
    "/api/admins/{id}": {
        get: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "getAdminById",
          parameters: [
            ...param("id","path","string"),
          ],
          responses: response200("getAdmin")
        },
        put: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "putAdmin",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Admin", "putAdmin")
          ],
          responses: response201("Admin Updated")
        },
        delete: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "deleteAdmin",
          parameters: param("id","path","string"),
          responses: response201()
        }
    },
    "/api/admins/change/password": {
        put: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "changePasswordAdmin",
          parameters: [
            ...bodyParam("Change password Admin", "putPasswordAdmin")
          ],
          responses: response201("Password Updated")
        }
    },
    "/api/admins/{id}/reset-password": {
      put: {
        tags: [
          "Admins"
        ],
        "x-swagger-router-controller": "admins",
        operationId: "resetPasswordAdmin",
        parameters: [
          ...param("id","path","string")
        ],
        responses: response201("Password Updated")
      }
    },
    "/api/admins/{id}/role": {
        put: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "putAdmin",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Admin role", "putRoleAdmin")
          ],
          responses: response201("Role Updated")
        }
    },
    "/api/admins/{id}/logs": {
        get: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "getLogsAdminById",
          parameters: [
            ...param("id","path","string"),
            ...param("start_date","query","string",false),
            ...param("end_date","query","string",false),
            ...pagination
          ],
          responses: response200("getLogsAdmin")
        },
        post: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "postLogAdmin",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Post log Admin", "postLogAdmin")
          ],
          responses: response201()
        }
    },
    "/api/admins/logs/getAll": {
        get: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "getLogsAdmins",
          parameters: [
            ...param("start_date","query","string",false),
            ...param("end_date","query","string",false),
            ...pagination
          ],
          responses: response200("getLogsAdmins")
        }
    },
    "/api/admins/logs/truncate": {
        delete: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "truncateLogsAdmins",
          parameters: [
            ...param("start_date","query","string",false),
            ...param("end_date","query","string",false)
          ],
          responses: response201()
        }
    },
}