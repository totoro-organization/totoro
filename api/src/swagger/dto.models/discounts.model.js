const {date, arrayType, labelType, discount, discountProperties, partner, roleAndDiscountTypeProps} = require("../generique/index");

module.exports = {
    getAllDiscounts: function(){
        return arrayType(module.exports.getDiscount());
    },
    postDiscount: function(){
        return {
            type: "object",
            properties: {
              type_disc_id: {
                type: "string"
              },
              partner_id: {
                type: "string"
              },
              name: {
                type: "string"
              },
              description: {
                type: "string"
              },
              condition: {
                type: "string"
              },
              cost: {
                type: "integer"
              },
              duration: {
                type: "integer"
              }
            },
            required: [
              "type_disc_id",
              "partner_id",
              "name"
            ],
            example: {
              type_disc_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1",
              partner_id: "561a448e-5ad9-4dd5-1208-7cc0419824d5",
              name: "Promo 100%",
              description: "Lorem ipsum, bla bla bla",
              condition: "Lorem ipsum, bla bla bla",
              cost: 150,
              duration: 12
            }
        }
    },
    getDiscount: function(){
      return {
        type: "object",
        properties: {
          ...discountProperties(),
          ...date(),
          status: labelType(),
          partner: partner(),
          type: roleAndDiscountTypeProps(),
        }
      }
    },
    putDiscount: function(){
        return {
            type: "object",
            properties: {
              type_disc_id: {
                type: "string"
              },
              name: {
                type: "string"
              },
              description: {
                type: "string"
              },
              condition: {
                type: "string"
              },
              cost: {
                type: "integer"
              },
              duration: {
                type: "integer"
              }
            },
            example: {
              type_disc_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1",
              name: "Promo 100%",
              description: "Lorem ipsum, bla bla bla",
              condition: "Lorem ipsum, bla bla bla",
              cost: 150,
              duration: 12
            }
        }
    }
}