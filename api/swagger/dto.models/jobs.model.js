const {labelType, date, arrayType, objPut, job, user} = require("../generique");

module.exports = {
    getAllJobs: function(){
        return arrayType(module.exports.getJob());
    },
    getJob: function(){
      return job();
    },
    putJob: function(){
        return {
            type: "object",
            properties: {
              status_id: {
                type: "string"
              },
              difficulty_id: {
                type: "string"
              },
              title: {
                type: "string"
              },
              description: {
                type: "string"
              },
              participants_max: {
                type: "integer"
              },
              start_date: {
                type: "string"
              },
              end_date: {
                type: "string"
              },
              address: {
                type: "string"
              },
              cp: {
                type: "integer"
              },
              commune: {
                type: "string"
              },
              longitude: {
                type: "integer"
              },
              latitude: {
                type: "integer"
              },
              tags: {
                type: "array",
                items: {type: "string"}
              }
            },
            example: {
              status_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1",
              difficulty_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1",
              title: "Ramassage des ordures",
              description: "Lorem Ipsum bla bla bla bla bla",
              participants_max: 5,
              start_date: "2022-12-13",
              end_date: "2023-07-07",
              address: "3 allée des marronniers",
              cp: 77400,
              commune: "Champs-sur-Marne",
              longitude: 2.52655,
              latitude: 4.23665,
              tags : ["561a448e-5ad9-4dd5-8b08-7cc0419824d1", "561a448e-5ad9-4dd5-8b08-7cc0419824d1"],
            }
        }
    },
    getParticipantsJob: function(){
        return arrayType({
            type: "object",
            properties: {
              id: {
                type: "string"
              },
              qrcode: {
                type: "string"
              },
              jobs_id: {
                type: "string"
              },
              ...date(),
              participant: user(),
              status: labelType()
            }
        })
    },
    getFavoritesJob: function(){
        return arrayType({
            type: "object",
            properties: {
              id: {
                type: "string"
              },
              jobs_id: {
                type: "string"
              },
              ...date(),
              user: user()
            }
        })
    },
    getLitigationsJob: function(){
        return arrayType({
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
              jobs_id: {
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
                  participant: user(),
                }
              }
            }
        })
    }
}