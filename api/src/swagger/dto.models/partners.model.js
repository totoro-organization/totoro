const {labelType, date, arrayType, discountProperties, roleAndDiscountTypeProps, objPut, partnerProperties, user, discount } = require("../generique/index");

module.exports = {
    getTransactionsPartner: function(){
      return arrayType({
        type: "object",
        properties: {
          id: {type:"string"},
          qrcode: {type:"string"},
          end_date: {type:"string"},
          ...date(),
          user: user(),
          discount: discount(),
          status: labelType(),
        }
      })
    },
    getDiscountsPartner: function(){
        return {
            type: "object",
            properties: {
              ...discountProperties(),
              status: labelType(),
              type: roleAndDiscountTypeProps(),
            }
        }
    },
    putPartner: function(){
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
    getPartner: function(){
        return {
            type: "object",
            properties: {
              ...partnerProperties(),
              ...date(),
              status: labelType(),
              organization: user()
            }
        }
    },
    getAllPartners: function(){
        return arrayType(module.exports.getPartner());
    },
    postPartner: function(){
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
              email: "contact@partner.org",
              phone: "0753869526",
              type: "siren",
              typeValue: "775664410"
            }
        }
    }
}