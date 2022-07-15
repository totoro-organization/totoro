const tags = ["Commons"]
const pagination = require('./../generique/pagination')
const {response201, response200, bodyParam, param} = require("../generique");

module.exports = {
    "/api/status": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/status",
          operationId: "getAllStatus",
          parameters: [
            {
              name: "type",
              in: "query",
              type: "string",
              required: false,
              enum: [
                "Users",
                "Partners",
                "Jobs",
                "Groups",
                "Associations",
                "Admins"
              ]
            },
            ...pagination
          ],
          responses: response200("getAllRoles")
        },
        post: {
          tags,
          "x-swagger-router-controller": "commons/status",
          operationId: "postStatus",
          parameters: [
            ...bodyParam("Create Status", "postCommon")
          ],
          responses: response201("Status Created")
        }
    },
    "/api/status/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/status",
          operationId: "getStatusById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getRole")
        },
        put: {
          tags: [
            "Commons"
          ],
          "x-swagger-router-controller": "commons/status",
          operationId: "putStatus",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Status", "putCommon")
          ],
          responses: response201("Status Updated")
        }
    },
    "/api/change/status": {
        put: {
          tags,
          "x-swagger-router-controller": "commons/change",
          operationId: "changeStatus",
          parameters: [
            ...bodyParam("Change Status", "changeStatus")
          ],
          responses: response201("Status Changed")
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
            },
            {
              name: "type",
              in: "query",
              type: "string",
              required: false,
              enum: [
                "Users",
                "Admins"
              ]
            },
            ...pagination
          ],
          responses: response200("getAllRoles")
        },
        post: {
          tags,
          "x-swagger-router-controller": "commons/roles",
          operationId: "postRole",
          parameters: [
            ...bodyParam("Create Role", "postRole")
          ],
          responses: response201("Role Created")
        }
    },
    "/api/roles/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/roles",
          operationId: "getRoleById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getRole")
        },
        put: {
          tags,
          "x-swagger-router-controller": "commons/roles",
          operationId: "putRole",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Role", "putRole")
          ],
          responses: response201("Role Updated")
        },
        delete: {
          tags,
          "x-swagger-router-controller": "commons/roles",
          operationId: "deleteRole",
          parameters: param("id","path","string"),
          responses: response201()
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
            },
            ...pagination
          ],
          responses: response200("getAllRoles")
        },
        post: {
          tags,
          "x-swagger-router-controller": "commons/tags",
          operationId: "postTag",
          parameters: [
            ...bodyParam("Create Tag", "postCommon")
          ],
          responses: response201("Tag Created")
        }
    },
    "/api/tags/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/tags",
          operationId: "getTagById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getRole")
        },
        put: {
          tags,
          "x-swagger-router-controller": "commons/tags",
          operationId: "putTag",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Tag","putCommon")
          ],
          responses: response201("Tag Updated")
        },
        delete: {
          tags,
          "x-swagger-router-controller": "commons/tags",
          operationId: "deleteTag",
          parameters: param("id","path","string"),
          responses: response201()
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
            },
            ...pagination
          ],
          responses: response200("getAllPricings")
        },
        post: {
          tags,
          "x-swagger-router-controller": "commons/pricings",
          operationId: "postPricing",
          parameters: [
            ...bodyParam("Create Pricing", "postPricing")
          ],
          responses: response201("Pricing Created")
        }
    },
    "/api/pricings/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/pricings",
          operationId: "getPricingById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getPricing")
        },
        put: {
          tags,
          "x-swagger-router-controller": "commons/pricings",
          operationId: "putPricing",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Pricing", "putPricing")
          ],
          responses: response201("Pricing Updated")
        },
        delete: {
          tags,
          "x-swagger-router-controller": "commons/pricings",
          operationId: "deletePricing",
          parameters: param("id","path","string"),
          responses: response201()
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
            },
            ...pagination
          ],
          responses: response200("getAllDifficulties")
        },
        post: {
          tags,
          "x-swagger-router-controller": "commons/difficulties",
          operationId: "postDifficulty",
          parameters: [
            ...bodyParam("Create Difficulty", "postDifficulty")
          ],
          responses: response201("Difficulty Created")
        }
    },
    "/api/difficulties/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/difficulties",
          operationId: "getDifficultyById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getDifficulty")
        },
        put: {
          tags,
          "x-swagger-router-controller": "commons/difficulties",
          operationId: "putDifficulty",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Difficulty", "putDifficulty")
          ],
          responses: response201("Difficulty Updated")
        },
        delete: {
          tags,
          "x-swagger-router-controller": "commons/difficulties",
          operationId: "deleteDifficulty",
          parameters: param("id","path","string"),
          responses: response201()
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
            },
            ...pagination
          ],
          responses: response200("getAllLitigationObjects")
        },
        post: {
          tags,
          "x-swagger-router-controller": "commons/litigation-objects",
          operationId: "postLitigationObject",
          parameters: [
            ...bodyParam("Create Litigation Object", "postLitigationObject")
          ],
          responses: response201("Litigation Object Created")
        }
    },
    "/api/litigation-objects/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/litigation-objects",
          operationId: "getLitigationObjectById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getLitigationObject")
        },
        put: {
          tags,
          "x-swagger-router-controller": "commons/litigation-objects",
          operationId: "putLitigationObject",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Litigation Object", "putLitigationObject")
          ],
          responses: response201("Litigation Object Updated")
        },
        delete: {
          tags,
          "x-swagger-router-controller": "commons/litigation-objects",
          operationId: "deleteLitigationObject",
          parameters: param("id","path","string"),
          responses: response201()
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
            },
            ...pagination
          ],
          responses: response200("getAllTypeDiscounts")
        },
        post: {
          tags,
          "x-swagger-router-controller": "commons/types-discounts",
          operationId: "postTypeDiscount",
          parameters: [
            ...bodyParam("Create Type Discount", "postTypeDiscount")
          ],
          responses: response201("Litigation Type Discount")
        }
    },
    "/api/types-discounts/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/types-discounts",
          operationId: "getTypeDiscountById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getTypeDiscount")
        },
        put: {
          tags,
          "x-swagger-router-controller": "commons/types-discounts",
          operationId: "putTypeDiscount",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Type Discount", "putTypeDiscount")
          ],
          responses: response201("Litigation Type Discount")
        },
        delete: {
          tags,
          "x-swagger-router-controller": "commons/types-discounts",
          operationId: "deleteTypeDiscount",
          parameters: param("id","path","string"),
          responses: response201()
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
            },
            ...pagination
          ],
          responses: response200("getAllAppearances")
        },
        post: {
          tags,
          "x-swagger-router-controller": "commons/appearances",
          operationId: "postAppearance",
          consumes: [
            "multipart/form-data"
          ],
          parameters: [
            ...param("app_id","formData","string",true,"app id"),
            ...param("primary_theme","formData","string",true,"color of primary theme"),
            ...param("secondary_theme","formData","string",true,"color of secondary theme"),
            ...param("title","formData","string",true,"principal title of application"),
            ...param("logo","formData","file",true,"logo of application"),
            ...param("icon","formData","file",true,"icon of application"),
          ],
          responses: response201("Created Appearances")
        }
    },
    "/api/appearances/{id}": {
        get: {
          tags,
          "x-swagger-router-controller": "commons/appearances",
          operationId: "getAppearanceById",
          parameters: [
            ...param("id","path","string"),
          ],
          responses: response200("getAppearance")
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
            ...param("id","path","string"),
            ...param("primary_theme","formData","string",false,"color of primary theme"),
            ...param("secondary_theme","formData","string",false,"color of secondary theme"),
            ...param("title","formData","string",false,"principal title of application"),
            ...param("logo","formData","file",false,"logo of application"),
            ...param("icon","formData","file",false,"icon of application"),
          ],
          responses: response201("Updated Appearances")
        },
        delete: {
          tags: [
            "Commons"
          ],
          "x-swagger-router-controller": "commons/appearances",
          operationId: "deleteAppearance",
          parameters: param("id","path","string"),
          responses: response201()
        }
    }
}