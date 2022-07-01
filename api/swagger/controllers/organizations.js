const pagination = require('./../generique/pagination');
const {response201, response200, bodyParam, param} = require("../generique");

module.exports = {
    "/api/organizations": {
        get: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "getAllOrganizations",
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
          responses: response200("getAllOrganizations")
        },
        post: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "postOrganization",
          parameters: [
              ...bodyParam("Create Organization", "postOrganization")
          ],
          responses: response201("Organization Created")
        }
    },
    "/api/organizations/{id}": {
        get: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "getOrganizationById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getOrganization")
        },
        put: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "putOrganization",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Organization", "putOrganization")
          ],
          responses: response201("Organization Updated")
        },
        delete: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "deleteOrganization",
          parameters: param("id","path","string"),
          responses: response201()
        }
    },
    "/api/organizations/{id}/jobs": {
        get: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "getJobsOrganizationById",
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
          responses: response200("getJobsOrganization")
        }
    },
    "/api/organizations/{id}/members": {
        get: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "getMembersOrganizationById",
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
          responses: response200("getMembersOrganization")
        }
    },
    "/api/organizations/{id}/favorites": {
        get: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "getFavoritessOrganizationById",
          parameters: [
            ...param("id","path","string"),
            ...pagination
          ],
          responses: response200("getFavoritessOrganization")
        }
    },
    "/api/organizations/{id}/current-subscription": {
        get: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "getCurrentSubscriptionOrganizationById",
          parameters: [
            ...param("id","path","string")
          ],
          responses: response200("getCurrentSubscriptionOrganization")
        }
    },
    "/api/organizations/{id}/subscriptions": {
        get: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "getSubscriptionsOrganizationById",
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
          responses: response200("getSubscriptionsOrganization")
        }
    },
    "/api/organizations/{id}/subscriptions/change": {
      put: {
        tags: [
          "Organizations"
        ],
        "x-swagger-router-controller": "organizations",
        operationId: "putChangeSubscription",
        parameters: [
          ...param("id","path","string"),
          ...bodyParam("Change Subscription", "putChangeSubscription")
        ],
        responses: response201("Subscription Changed")
      }
    },
    "/api/organizations/{id}/request": {
        post: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "postRequestOrganization",
          parameters: [
            ...param("id","path","string"),
          ],
          responses: response201("Request sended")
        }
    },
    "/api/organizations/{id}/invite": {
        post: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "postInviteOrganization",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Send Invitation","postInviteOrganization"),
          ],
          responses: response201("Invitation sended")
        }
    },
    "/api/organizations/response/{memberId}": {
        put: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "putResponseOrganization",
          parameters: [
            ...param("memberId","path","string"),
            ...bodyParam("Response Organization","putResponseOrganization"),
          ],
          responses: response201("Response Organization is gived")
        }
    },
    "/api/organizations/member/{memberId}": {
        put: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "putMemberOrganization",
          parameters: [
            ...param("memberId","path","string"),
            ...bodyParam("Update Member","putMemberOrganization"),
          ],
          responses: response201("Member Updated")
        }
    },
    "/api/organizations/logo/{id}": {
        put: {
          tags: [
            "Organizations"
          ],
          "x-swagger-router-controller": "organizations",
          operationId: "putLogoOrganization",
          consumes: [
            "multipart/form-data"
          ],
          parameters: [
            ...param("id","path","string"),
            ...param("logo","formData","file",true,"Logo de l'association"),
          ],
          responses: response201("Organization logo's Updated")
        }
    }
}