const {labelType, date, arrayType, objPut} = require("../generique/index");
module.exports = {
    getApplication: function(){
      return {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          name: {
            type: "string"
          },
          ...date(),
          status: labelType()
        }
      }
    },
    getAllApplications: function() {
      return arrayType(module.exports.getApplication()) 
    },
    postApplication: function(){
      return {
        type: "object",
        properties: {
          name: {
            type: "string"
          }
        },
        required: [
          "name"
        ],
        example: {
          name: "Test"
        }
      }
    },
    putApplication: function(){
      return objPut(module.exports.postApplication())
    },
}