module.exports = {
  labelType: function(){
    return {
      type: "object",
      properties: {
        label: {
          type: "string",
        },
        type: {
          type: "string",
        }
      }
    } 
  },
  date: function(){
    return {
      createdAt: {
        type: "string"
      },
      updatedAt: {
        type: "string"
      }
    }
  },
  organizationProperties: function() {
    return {
      id: {
        type: "string"
      },
      siren: {
        type: "string"
      },
      siret: {
        type: "string"
      },
      name: {
        type: "string"
      },
      email: {
        type: "string"
      },
      longitude: {
        type: "integer"
      },
      latitude: {
        type: "integer"
      },
      creation_date: {
        type: "string"
      },
      activity: {
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
      logo: {
        type: "string"
      },
      description: {
        type: "string"
      },
      link: {
        type: "string"
      },
      phone: {
        type: "string"
      }
    }
  },
  userProperties: function() {
    return {
      id: {
        type: "string"
      },
      username: {
        type: "string"
      },
      firstname: {
        type: "string"
      },
      lastname: {
        type: "string"
      },
      email: {
        type: "string"
      },
      birthday: {
        type: "string"
      },
      longitude: {
        type: "integer"
      },
      latitude: {
        type: "integer"
      },
      avatar: {
        type: "string"
      },
      bio: {
        type: "string"
      },
      phone: {
        type: "string"
      },
      total_token: {
        type: "integer"
      }
    }
  },
  adminProperties: function() {
    return {
      id: {
        type: "string"
      },
      username: {
        type: "string"
      },
      firstname: {
        type: "string"
      },
      lastname: {
        type: "string"
      },
      email: {
        type: "string"
      }
    }
  },
  jobProperties: function() {
    return {
      id: {
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
      address: {
        type: "string"
      },
      cp: {
        type: "integer"
      },
      commune: {
        type: "string"
      },
      start_date: {
        type: "string"
      },
      end_date: {
        type: "string"
      },
      longitude: {
        type: "integer"
      },
      latitude: {
        type: "integer"
      },
      isExpired: {
        type: "boolean"
      },
      qrcode: {
        type: "string"
      },
      remaining_place: {
        type: "integer"
      },
      ...module.exports.date()
    }
  },
  organization: function() {
    return {
      type: "object",
      properties: {
        ...module.exports.organizationProperties(),
        status: module.exports.labelType()
      }
    }
  },
  user: function() {
    return {
      type: "object",
      properties: {
        ...module.exports.userProperties(),
        status: module.exports.labelType()
      }
    }
  },
  job: function() {
    return {
      type: "object",
      properties: {
        ...module.exports.jobProperties(),
        author: {
          type: "object",
          properties: {
            ...module.exports.date(),
            organization: module.exports.organization(),
            user: module.exports.user(),
            status: module.exports.labelType(),
          }
        },
        difficulty: module.exports.difficulty(),
        status: module.exports.labelType()
      }
    }
  },
  difficulty: function(){
    return {
      type: "object",
      properties: {
        level: {
          type: "integer"
        },
        token: {
          type: "integer"
        }
      }
    }
  },
  arrayType: function(items) {
    return {
      type: "object",
      properties: {
        total_rows: {
          type: "integer"
        },
        data: {
          type: "array",
          items
        }
      }
    }
  },
  objPut: function (obj) {
    const {example, properties } = obj
    return {
      type: "object",
      properties,
      required: [],
      example
    }
  }
}