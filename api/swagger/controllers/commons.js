const tags = ["Commons"]
module.exports = {
    "/api/status": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/status",
          operationId: "getAllStatus",
          parameters: [],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getAllRoles"
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
          tags,
          "x-swagger-router-controller": "commons/status",
          operationId: "postStatus",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Create Status",
              required: true,
              schema: {
                $ref: "#/definitions/postCommon"
              }
            }
          ],
          responses: {
            201: {
              description: "Status Created",
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
    "/api/status/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/status",
          operationId: "getStatusById",
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
                $ref: "#/definitions/getRole"
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
            "Commons"
          ],
          "x-swagger-router-controller": "commons/status",
          operationId: "putStatus",
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
              description: "Update Status",
              required: true,
              schema: {
                $ref: "#/definitions/putCommon"
              }
            }
          ],
          responses: {
            201: {
              description: "Status Updated",
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
    "/api/change/status": {
        put: {
          tags,
          "x-swagger-router-controller": "commons/change",
          operationId: "changeStatus",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Change Status",
              required: true,
              schema: {
                $ref: "#/definitions/changeStatus"
              }
            }
          ],
          responses: {
            201: {
              description: "Status Changed",
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
    "/api/roles": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/roles",
          operationId: "getAllRoles",
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
            }
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getAllRoles"
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
          tags,
          "x-swagger-router-controller": "commons/roles",
          operationId: "postRole",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Create Role",
              required: true,
              schema: {
                $ref: "#/definitions/postRole"
              }
            }
          ],
          responses: {
            201: {
              description: "Role Created",
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
    "/api/roles/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/roles",
          operationId: "getRoleById",
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
                $ref: "#/definitions/getRole"
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
          tags,
          "x-swagger-router-controller": "commons/roles",
          operationId: "putRole",
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
              description: "Update Role",
              required: true,
              schema: {
                $ref: "#/definitions/putRole"
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
        },
        delete: {
          tags,
          "x-swagger-router-controller": "commons/roles",
          operationId: "deleteRole",
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
    "/api/tags": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/tags",
          operationId: "getAllTags",
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
              name: "type",
              in: "query",
              type: "string",
              required: false,
              enum: [
                "mission",
                "category"
              ]
            }
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getAllRoles"
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
          tags,
          "x-swagger-router-controller": "commons/tags",
          operationId: "postTag",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Create Tag",
              required: true,
              schema: {
                $ref: "#/definitions/postCommon"
              }
            }
          ],
          responses: {
            201: {
              description: "Tag Created",
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
    "/api/tags/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/tags",
          operationId: "getTagById",
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
                $ref: "#/definitions/getRole"
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
          tags,
          "x-swagger-router-controller": "commons/tags",
          operationId: "putTag",
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
              description: "Update Tag",
              required: true,
              schema: {
                $ref: "#/definitions/putCommon"
              }
            }
          ],
          responses: {
            201: {
              description: "Tag Updated",
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
          tags,
          "x-swagger-router-controller": "commons/tags",
          operationId: "deleteTag",
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
    "/api/pricings": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/pricings",
          operationId: "getAllPricings",
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
            }
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getAllPricings"
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
          tags,
          "x-swagger-router-controller": "commons/pricings",
          operationId: "postPricing",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Create Pricing",
              required: true,
              schema: {
                $ref: "#/definitions/postPricing"
              }
            }
          ],
          responses: {
            201: {
              description: "Pricing Created",
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
    "/api/pricings/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/pricings",
          operationId: "getPricingById",
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
                $ref: "#/definitions/getPricing"
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
          tags,
          "x-swagger-router-controller": "commons/pricings",
          operationId: "putPricing",
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
              description: "Update Pricing",
              required: true,
              schema: {
                $ref: "#/definitions/putPricing"
              }
            }
          ],
          responses: {
            201: {
              description: "Pricing Updated",
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
          tags,
          "x-swagger-router-controller": "commons/pricings",
          operationId: "deletePricing",
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
    "/api/difficulties": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/difficulties",
          operationId: "getAllDifficulties",
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
            }
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getAllDifficulties"
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
          tags,
          "x-swagger-router-controller": "commons/difficulties",
          operationId: "postDifficulty",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Create Difficulty",
              required: true,
              schema: {
                $ref: "#/definitions/postDifficulty"
              }
            }
          ],
          responses: {
            201: {
              description: "Difficulty Created",
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
    "/api/difficulties/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/difficulties",
          operationId: "getDifficultyById",
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
                $ref: "#/definitions/getDifficulty"
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
          tags,
          "x-swagger-router-controller": "commons/difficulties",
          operationId: "putDifficulty",
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
              description: "Update Difficulty",
              required: true,
              schema: {
                $ref: "#/definitions/putDifficulty"
              }
            }
          ],
          responses: {
            201: {
              description: "Difficulty Updated",
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
          tags,
          "x-swagger-router-controller": "commons/difficulties",
          operationId: "deleteDifficulty",
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
    "/api/litigation-objects": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/litigation-objects",
          operationId: "getAllLitigationObjects",
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
            }
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getAllLitigationObjects"
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
          tags,
          "x-swagger-router-controller": "commons/litigation-objects",
          operationId: "postLitigationObject",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Create Litigation Object",
              required: true,
              schema: {
                $ref: "#/definitions/postLitigationObject"
              }
            }
          ],
          responses: {
            201: {
              description: "Litigation Object Created",
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
    "/api/litigation-objects/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/litigation-objects",
          operationId: "getLitigationObjectById",
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
                $ref: "#/definitions/getLitigationObject"
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
          tags,
          "x-swagger-router-controller": "commons/litigation-objects",
          operationId: "putLitigationObject",
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
              description: "Update Litigation Object",
              required: true,
              schema: {
                $ref: "#/definitions/putLitigationObject"
              }
            }
          ],
          responses: {
            201: {
              description: "Litigation Object Updated",
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
          tags,
          "x-swagger-router-controller": "commons/litigation-objects",
          operationId: "deleteLitigationObject",
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
    "/api/types-discounts": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/types-discounts",
          operationId: "getAllTypeDiscounts",
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
            }
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getAllTypeDiscounts"
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
          tags,
          "x-swagger-router-controller": "commons/types-discounts",
          operationId: "postTypeDiscount",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Create Type Discount",
              required: true,
              schema: {
                $ref: "#/definitions/postTypeDiscount"
              }
            }
          ],
          responses: {
            201: {
              description: "Litigation Type Discount",
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
    "/api/types-discounts/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/types-discounts",
          operationId: "getTypeDiscountById",
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
                $ref: "#/definitions/getTypeDiscount"
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
          tags,
          "x-swagger-router-controller": "commons/types-discounts",
          operationId: "putTypeDiscount",
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
              description: "Update Type Discount",
              required: true,
              schema: {
                $ref: "#/definitions/putTypeDiscount"
              }
            }
          ],
          responses: {
            201: {
              description: "Litigation Type Discount",
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
          tags,
          "x-swagger-router-controller": "commons/types-discounts",
          operationId: "deleteTypeDiscount",
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
    "/api/appearances": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/appearances",
          operationId: "getAllAppearances",
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
            }
          ],
          responses: {
            200: {
              description: "Successful request.",
              schema: {
                $ref: "#/definitions/getAllAppearances"
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
          tags,
          "x-swagger-router-controller": "commons/appearances",
          operationId: "postAppearance",
          consumes: [
            "multipart/form-data"
          ],
          parameters: [
            {
              name: "app_id",
              in: "formData",
              description: "app id",
              required: true,
              type: "string"
            },
            {
              name: "primary_theme",
              in: "formData",
              description: "color of primary theme",
              required: true,
              type: "string"
            },
            {
              name: "secondary_theme",
              in: "formData",
              description: "color of secondary theme",
              required: true,
              type: "string"
            },
            {
              name: "title",
              in: "formData",
              description: "principal title of appliaction",
              required: true,
              type: "string"
            },
            {
              name: "logo",
              in: "formData",
              description: "logo of application",
              required: true,
              type: "file"
            },
            {
              name: "icon",
              in: "formData",
              description: "icon of application",
              required: true,
              type: "file"
            }
          ],
          responses: {
            201: {
              description: "Created Appearances",
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
    "/api/appearances/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/appearances",
          operationId: "getAppearanceById",
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
                $ref: "#/definitions/getAppearance"
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
            "Commons"
          ],
          "x-swagger-router-controller": "commons/appearances",
          operationId: "putAppearances",
          consumes: [
            "multipart/form-data"
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              type: "string",
              required: true
            },
            {
              name: "primary_theme",
              in: "formData",
              description: "color of primary theme",
              required: false,
              type: "string"
            },
            {
              name: "secondary_theme",
              in: "formData",
              description: "color of secondary theme",
              required: false,
              type: "string"
            },
            {
              name: "title",
              in: "formData",
              description: "principal title of appliaction",
              required: false,
              type: "string"
            },
            {
              name: "logo",
              in: "formData",
              description: "logo of application",
              required: false,
              type: "file"
            },
            {
              name: "icon",
              in: "formData",
              description: "icon of application",
              required: false,
              type: "file"
            }
          ],
          responses: {
            201: {
              description: "Updated Appearances",
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
            "Commons"
          ],
          "x-swagger-router-controller": "commons/appearances",
          operationId: "deleteAppearance",
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
    }
}