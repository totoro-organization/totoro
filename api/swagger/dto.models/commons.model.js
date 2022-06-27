const {labelType, date, arrayType, objPut} = require("../generique");

module.exports = {
    getRole: function(){
      return {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          ...labelType().properties,
          ...date(),
          status: labelType()
        }
      }
    },
    getAllRoles: function () {
      return arrayType(module.exports.getRole()) 
    },
    postRole: function(){
      return {
        type: "object",
        properties: labelType().properties,
        required: [
          "label",
          "type"
        ],
        example: {
          label: "Test",
          type: "['Admins']"
        }
      }
    },
    putRole: function(){
      return objPut(module.exports.postRole);
    },
    getCommon: function(){
      return {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          label: {
            type: "string"
          },
          ...date(),
          status: labelType()
        }
      }
    },
    getAllCommons: function(){
      return arrayType(module.exports.getCommon);
    },  
    postCommon: function(){
      return {
        type: "object",
        properties: {
          label: {
            type: "string"
          }
        },
        required: [
          "label"
        ],
        example: {
          label: "Test"
        }
      }
    },
    putCommon: function(){
      return objPut(module.exports.postCommon())
    },
    changeStatus: function(){
      return {
        type: "object",
        properties: {
          tableName: {
            type: "string"
          },
          id: {
            type: "string"
          },
          status_id: {
            type: "string"
          }
        },
        required: [
          "tableName",
          "id",
          "status_id"
        ],
        example: {
          tableName: "Users",
          id: "561a448e-5ad9-4dd5-1208-7cc0419824d5",
          status_id: "561a448e-ggd4-4dd5-1208-8aa0419824d5"
        }
      }
    },
    getLitigationObject: function(){
      return {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          label: {
            type: "string"
          },
          description: {
            type: "string"
          },
          ...date(),
          status: labelType()
        }
      }
    },
    getAllLitigationObjects: function(){
      return arrayType(module.exports.getLitigationObject())
    },
    postLitigationObject: function(){
      return {
        type: "object",
        properties: {
          label: {
            type: "string"
          },
          description: {
            type: "string"
          }
        },
        required: [
          "label",
          "description"
        ],
        example: {
          label: "Test",
          description: "Lorem ipsum, bla bla bla"
        }
      }
    },
    putLitigationObject: function(){
      return objPut(module.exports.postLitigationObject())
    },
    getDifficulty: function(){
      return {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          level: {
            type: "integer"
          },
          token: {
            type: "integer"
          },
          ...date(),
          status: labelType()
        }
      }
    },
    getAllDifficulties: function() {
      return arrayType(module.exports.getDifficulty())
    },
    postDifficulty: function(){
      return {
        type: "object",
        properties: {
          level: {
            type: "integer"
          },
          token: {
            type: "integer"
          }
        },
        required: [
          "level",
          "token"
        ],
        example: {
          level: 1,
          token: 12
        }
      }
    },
    putDifficulty: function(){
      return objPut(module.exports.postDifficulty())
    },
    getTypeDiscount: function(){
      return module.exports.getRole()
    },
    getAllTypeDiscounts: function(){
      return module.exports.getAllRoles()
    },    
    postTypeDiscount: function(){
      return {
        type: "object",
        properties: module.exports.postRole().properties,
        required: module.exports.postRole().required,
        example: {
          label: "Montant",
          type: "Number"
        }
      }
    },
    putTypeDiscount: function(){
      return objPut(module.exports.postTypeDiscount())
    },
    getPricing: function(){
      return {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          label: {
            type: "string"
          },
          description: {
            type: "string"
          },
          duration: {
            type: "integer"
          },
          nb_account: {
            type: "integer"
          },
          nb_jobs_by_month: {
            type: "integer"
          },
          price: {
            type: "integer"
          },
          nb_attachments_by_publish: {
            type: "integer"
          },
          social_publish: {
            type: "boolean"
          },
          flux_activities: {
            type: "boolean"
          },
          certifate: {
            type: "boolean"
          },
          ...date(),
          status: labelType()
        }
      }
    },
    getAllPricings: function(){
      return arrayType(module.exports.getPricing())
    },
    postPricing: function(){
      return {
        type: "object",
        properties: {
          label: {
            type: "string"
          },
          description: {
            type: "string"
          },
          duration: {
            type: "integer"
          },
          price: {
            type: "integer"
          },
          nb_account: {
            type: "integer"
          },
          nb_jobs_by_month: {
            type: "integer"
          },
          nb_attachments_by_publish: {
            type: "integer"
          },
          social_publish: {
            type: "boolean"
          },
          flux_activities: {
            type: "boolean"
          },
          certifate: {
            type: "boolean"
          }
        },
        required: [
          "label",
          "description",
          "duration",
          "price",
          "nb_attachments_by_publish",
          "certifate",
          "flux_activities",
          "social_publish"
        ],
        example: {
          label: "Test",
          description: "Lorem ipsum, bla bla bla",
          duration: 1,
          nb_account: 5,
          nb_jobs_by_month: 7,
          price: 9.99,
          nb_attachments_by_publish: 10,
          certifate: 1,
          flux_activities: 0,
          social_publish: 1
        }
      }
    },
    putPricing: function(){
      return objPut(module.exports.postPricing())
    },
    getAppearance: function(){
      return {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          logo: {
            type: "string"
          },
          icon: {
            type: "string"
          },
          primary_theme: {
            type: "string"
          },
          secondary_theme: {
            type: "string"
          },
          title: {
            type: "string"
          },
          ...date(),
          application: {
            type: "object",
            properties: {
              name: {
                type: "string"
              }
            }
          },
          status: labelType()
        }
      }
    },
    getAllAppearances: function(){
      return arrayType(module.exports.getAppearance())
    }
}