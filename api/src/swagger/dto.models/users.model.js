const { labelType, date, organization, userProperties, arrayType, job, partner, tokenProperties, discount } = require("../generique/index");
module.exports = {
  getUser: function() {
    return {
      type: "object",
      properties: {
        ...userProperties(),
        ...date(),
        status: labelType(),
        memberships: arrayType(
          {
            type: "object",
            properties: {
              ...date(),
              organization: organization(),
              role: labelType(),
              status: labelType()
            }
          }
        ),
        partners: arrayType(partner())
      }
    }
  },
  getAllUsers: function() {
    return arrayType(module.exports.getUser())
  },
  putUser: function () {
    return {
      type: "object",
      properties: {
        firstName: {
          type: "string"
        },
        lastName: {
          type: "string"
        },
        email: {
          type: "string"
        },
        bio: {
          type: "string"
        },
        phone: {
          type: "string"
        },
        longitude: {
          type: "integer"
        },
        latitude: {
          type: "integer"
        }
      },
      example: {
        firstname: "Quentin",
        lastname: "Huber",
        email: "h.quentin@totoro.fr",
        bio: "Je suis très sympa",
        phone: "0751932695",
        longitude: 2.43796,
        latitude: 48.8268
      }
    }
  },
  resetPassword: function () {
    return {
      type: "object",
      properties: {
        token: {
          type: "string"
        },
        password: {
          type: "string"
        }
      },
      required: ["token", "password"],
      example: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwMjRiZDE4LWIzMTQtNDY0NC04ODk1LWJhOTExNjMyMjk3MyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTcxMTAwMjcsImV4cCI6MTY1NzcxNDgyN30.R28-24cn66wzZSZtWqNhw23_Mp4Nag3L7b67J4HyIbU",
        password: "123456"
      }
    }
  },
  postFavotitesUser: function() {
    return {
      type: "object",
      properties: {
        assos_id: {
          type: "string"
        },
        jobs_id: {
          type: "string"
        }
      },
      example: {
        assos_id: "561a448e-5ad9-4dd5-8b08-7cc0419824d1"
      }
    }
  },
  getFavoritesUser: function(){
    return arrayType(
      {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          user_id: {
            type: "string"
          },
          ...date(),
          organization: organization(),
          job: job()
        }
      }
    )
  },  
  getJobsUser: function(){
    return arrayType({
      type: "object",
      properties: {
        id: {
          type: "string"
        },
        user_id: {
          type: "string"
        },
        ...date(),
        job: job(),
        status: labelType()
      }
    })
  },
  getLitigationsUser: function(){
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
        ...date,
        status: labelType(),
        litigation_object: {
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
            job: job()
          }
        }
      }
    })
  },
  getTransactionsUser: function () {
    return arrayType({
      type: "object",
      properties: {
        ...tokenProperties(),
        user_id: {
          type: "string"
        },
        ...date,
        status: labelType(),
        discount: discount()
      }
    })
  }
}