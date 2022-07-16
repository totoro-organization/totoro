const {labelType, jobProperties, organization, difficulty, date, arrayType, attachments, objPut, job, user} = require("../generique/index");

module.exports = {
    getParticipation: function(){
      return {
        type: "object",
        properties: {
          status: labelType(),
          participant: user(),
          job: {
            type: "object",
            properties: {
              ...jobProperties(),
              author: {
                type: "object",
                properties: {
                  ...date(),
                  organization: organization(),
                  user: user(),
                  status: labelType(),
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
              attachments: arrayType(attachments()),
              status: labelType(), 
            }
          }
        }
      }
    },
    putParticipation: function(){
        return {
            type: "object",
            properties: {
              status_id: {
                type: "string"
              },
            },
            required : ["status_id"],
            example: {
              status_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1"
            }
        }
    }
}