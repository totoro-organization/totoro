const { labelType, date, organization, user, arrayType, job, tokenProperties, discount } = require("../generique/index");
module.exports = {
  getTransaction: function() {
    return {
      type: "object",
      properties: {
        ...tokenProperties(),
        ...date,
        status: labelType(),
        discount: discount(),
        user: user()
      }
    }
  },
  getAllTransactions: function() {
    return arrayType(module.exports.getTransaction())
  },
  putTransaction: function () {
    return {
      type: "object",
      properties: {
        status_id: {
          type: "string"
        },
      },
      required: ["status_id"],
      example: {
        status_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1"
      }
    }
  },
  postTransaction: function() {
    return {
      type: "object",
      properties: {
        discount_id: {
          type: "string"
        }
      },
      required: ["discount_id"],
      example: {
        discount_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1"
      }
    }
  }
}