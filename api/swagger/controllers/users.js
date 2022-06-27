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
            }
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getAllUsers"
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
    "/api/users/{id}": {
        get: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "getUserById",
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
                $ref: "#/definitions/getUser"
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
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "putUser",
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
              description: "Update User",
              required: true,
              schema: {
                $ref: "#/definitions/putUser"
              }
            }
          ],
          responses: {
            201: {
              description: "User Updated",
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
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "deleteUser",
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
    "/api/users/change/password": {
        put: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "changePasswordUser",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Change password User",
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
            {
              name: "avatar",
              in: "formData",
              description: "avatar for user",
              required: true,
              type: "file"
            }
          ],
          responses: {
            201: {
              description: "Updated Avatar User",
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
    "/api/users/{id}/favorites": {
        get: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "getFavotitesUser",
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
                $ref: "#/definitions/getFavoritesUser"
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
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "postFavotitesUser",
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
              description: "Add Favorite for User",
              required: true,
              schema: {
                $ref: "#/definitions/postFavotitesUser"
              }
            }
          ],
          responses: {
            201: {
              description: "Favorite added",
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
    "/api/users/{id}/jobs": {
        get: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "getJobsUser",
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
                $ref: "#/definitions/getJobsUser"
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
    "/api/users/{id}/litigations": {
        get: {
          tags: [
            "Users"
          ],
          "x-swagger-router-controller": "users",
          operationId: "getLitigationsUser",
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
                $ref: "#/definitions/getLitigationsUser"
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