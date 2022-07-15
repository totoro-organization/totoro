const {labelType, date, job, user, arrayType, objPut} = require("../generique");

module.exports = {
    postLitigation: function(){
      return {
        type: "object",
        properties: {
          litigation_object_id: {
            type: "string"
          },
          group_id: {
            type: "string"
          },
          type: {
            type: "boolean"
          },
          message: {
            type: "string"
          }
        },
        required: [
          "litigation_object_id",
          "group_id",
          "type"
        ],
        example: {
          litigation_object_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1",
          group_id: "561a448e-5ad9-4dd5-1208-7cc0419824d5",
          type: 0,
          message: "Lorem ipsum, bla bla bla"
        }
      }
    },
    putLitigation: function(){
      return {
        type: "object",
        properties: {
          status_id: {
            type: "string"
          }
        },
        required: [
          "status_id"
        ],
        example: {
          status_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1"
        }
      }
    },
    getLitigation: function(){
      return {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          type: {
            type: "boolean"
          },
          message: {
            type: "string"
          },
          ...date(),
          status: labelType(),
          litigation_object: {
            type: "object",
            properties: {
              label: {
                type: "string"
              },
              description: {
                type: "string"
              }
            }
          },
          mission: {
            type: "object",
            properties: {
              id: {
                type: "string"
              },
              ...date(),
              job: job(),        
              participant: user(),
            }
          }
        }
      }
    },
    getAllLitigations: function(){
      return arrayType(module.exports.getLitigation())
    },
}