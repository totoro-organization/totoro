const pagination = require('./../generique/pagination')

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
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getAllAdmins"
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
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "postAdmin",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Create Admin",
              required: true,
              schema: {
                $ref: "#/definitions/postAdmin"
              }
            }
          ],
          responses: {
            201: {
              description: "Admin Created"
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
    "/api/admins/{id}": {
        get: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "getAdminById",
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
                $ref: "#/definitions/getAdmin"
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
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "putAdmin",
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
              description: "Update Admin",
              required: true,
              schema: {
                $ref: "#/definitions/putAdmin"
              }
            }
          ],
          responses: {
            201: {
              description: "Admin Updated",
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
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "deleteAdmin",
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
    "/api/admins/change/password": {
        put: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "changePasswordAdmin",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Change password Admin",
              required: true,
              schema: {
                $ref: "#/definitions/putPasswordAdmin"
              }
            }
          ],
          responses: {
            201: {
              description: "Password Updated",
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
    "/api/admins/{id}/role": {
        put: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "putAdmin",
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
              description: "Update Admin role",
              required: true,
              schema: {
                $ref: "#/definitions/putRoleAdmin"
              }
            }
          ],
          responses: {
            201: {
              description: "Role Updated",
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
    "/api/admins/{id}/logs": {
        get: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "getLogsAdminById",
          parameters: [
            {
              name: "id",
              in: "path",
              type: "string",
              required: true
            },
            {
              name: "start_date",
              in: "query",
              type: "string",
              required: false
            },
            {
              name: "end_date",
              in: "query",
              type: "string",
              required: false
            },
            ...pagination
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getLogsAdmin"
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
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "postLogAdmin",
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
              description: "Post log Admin",
              required: true,
              schema: {
                $ref: "#/definitions/postLogAdmin"
              }
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
    "/api/admins/logs/getAll": {
        get: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "getLogsAdmins",
          parameters: [
            {
              name: "start_date",
              in: "query",
              type: "string",
              required: false
            },
            {
              name: "end_date",
              in: "query",
              type: "string",
              required: false
            },
            ...pagination
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getLogsAdmins"
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
    "/api/admins/logs/truncate": {
        delete: {
          tags: [
            "Admins"
          ],
          "x-swagger-router-controller": "admins",
          operationId: "truncateLogsAdmins",
          parameters: [
            {
              name: "start_date",
              in: "query",
              type: "string",
              required: false
            },
            {
              name: "end_date",
              in: "query",
              type: "string",
              required: false
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