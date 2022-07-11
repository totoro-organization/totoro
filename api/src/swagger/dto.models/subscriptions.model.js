const {labelType, date, arrayType, organization, subscriptionProperties, pricing} = require("../generique/index");

module.exports = {
    getAllSubscriptions: function(){
        return arrayType(module.exports.getSubscription())
    },
    getSubscription: function(){
        return {
            type: "object",
            properties: {
              ...subscriptionProperties(),
              ...date(),
              pricing : pricing(),
              status: labelType(),
              organization: organization()
            }
        }
    },
    postSubscription: function(){
        return {
            type: "object",
            properties: {
              pricing_id: {
                type: "string"
              },
              assos_id: {
                type: "string"
              }
            },
            required: [
              "pricing_id",
              "assos_id"
            ],
            example: {
              pricing_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1",
              assos_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1"
            }
        }
    },
    putSubscription: function(){
        return {
            type: "object",
            properties: {
              status_id: {type: "string" }
            },
            required: [
              "status_id"
            ],
            example: {
              status_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1"
            }
        }
    }
}