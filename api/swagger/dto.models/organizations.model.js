const {labelType, date, arrayType, memberships, pricing, organizationProperties, jobProperties, subscriptionProperties, user, difficulty, attachments} = require("../generique");

module.exports = {
    putMemberOrganization: function(){
        return {
            type: "object",
            properties: {
              status_id: {
                type: "string"
              },
              role_id: {
                type: "string"
              },
            },
            required: [
                "status_id",
                "role_id",
            ],
            example: {
              status_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1",
              role_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1",
            }
        } 
    },
    putResponseOrganization: function(){
        return {
            type: "object",
            properties: {
              status_id: {
                type: "string"
              },
            },
            required: [
                "status_id"
            ],
            example: {
              status_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1"
            }
        } 
    },
    postInviteOrganization: function(){
        return {
            type: "object",
            properties: {
              user_id: {
                type: "string"
              },
            },
            required: [
                "user_id"
            ],
            example: {
                user_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1"
            }
        } 
    },
    getSubscriptionsOrganization: function(){
        return arrayType(module.exports.getCurrentSubscriptionOrganization());
    },
    getCurrentSubscriptionOrganization: function(){
        return {
            type: "object",
            properties: {
              ...subscriptionProperties(),
              assos_id: {type: "string"},
              ...date(),
              pricing : pricing(),
              status: labelType()
            }
        }
    },
    getMembersOrganization: function(){
        return arrayType(
            {
                type: "object",
                properties: {
                  id: {
                    type: "string"
                  },
                  assos_id: {
                    type: "string"
                  },
                  ...date(),
                  user: user(),
                  role: labelType(),
                  status: labelType(),
                }
            }
        );
    },
    getFavoritessOrganization: function(){
        return arrayType(
            {
                type: "object",
                properties: {
                  id: {
                    type: "string"
                  },
                  assos_id: {
                    type: "string"
                  },
                  ...date(),
                  user: user()
                }
            }
        );
    },
    getJobsOrganization: function(){
        return arrayType(
            {
                type: "object",
                properties: {
                  ...jobProperties(),
                  assos_id:{type: "string"},
                  author: {
                    type: "object",
                    properties: {
                      ...date(),
                      user: user(),
                      status: labelType(),
                      attachments: arrayType(attachments())
                    }
                  },
                  difficulty: difficulty(),
                  tags: {
                    type: "object",
                    properties: {
                      total_rows: {
                        type: "integer"
                      },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {type: "string"},
                            tag: labelType()
                          }
                        }
                      }
                    }
                  },
                  status: labelType(),
                }
            }
        );
    },
    putOrganization: function(){
        return {
            type: "object",
            properties: {
              email: {
                type: "string"
              },
              phone: {
                type: "string"
              },
              status_id: {
                type: "string"
              }
            },
            example: {
              email: "contact@partner.org",
              phone: "0753869526",
              status_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1"
            }
        } 
    },
    getOrganization: function(){
        return {
            type: "object",
            properties: {
              ...organizationProperties(),
              ...date(),
              status: labelType(),
              members: arrayType(memberships())
            }
        }
    },
    getAllOrganizations: function(){
        return arrayType(module.exports.getOrganization())
    },
    postOrganization: function(){
        return {
            type: "object",
            properties: {
              email: {
                type: "string"
              },
              phone: {
                type: "string"
              },
              type: {
                type: "string"
              },
              typeValue: {
                type: "string"
              }
            },
            required: [
              "email",
              "phone",
              "type",
              "typeValue"
            ],
            example: {
              email: "contact@association.org",
              phone: "0753869526",
              type: "siren",
              typeValue: "775664410"
            }
        }
    },
    putChangeSubscription: function(){
        return {
            type: "object",
            properties: {
                pricing_id: {
                type: "string"
              }
            },
            required: [
                "pricing_id"
            ],
            example: {
                pricing_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1"
            }
        }
    }
}