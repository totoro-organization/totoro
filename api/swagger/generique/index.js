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
  pricingProperties: function () {
    return {
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
      }
    }
  },
  roleAndDiscountTypeProps: function(){
    return {
      type: "object",
      properties: {
        id: {
          type: "string"
        },
        ...module.exports.labelType().properties,
        status: module.exports.labelType()
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
  partnerProperties: function() {
    return {
      id: {
        type: "string"
      },
      name: {
        type: "string"
      },
      email: {
        type: "string"
      },
      address: {
        type: "string"
      },
      in_internet: {
        type: "boolean"
      },
      in_store: {
        type: "boolean"
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
  attachments: function() {
    return {
      type: "object",
      properties: {
        id: {
          type: "string"
        },
        original_name: {
          type: "string"
        },
        type: {
          type: "string"
        },
        image: {
          type: "string"
        }
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
  discountProperties: function() {
    return {
      id: {
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
    }
  },
  subscriptionProperties: function() {
    return {
      id: {
        type: "string"
      },
      expirate: {
        type: "string"
      },
      current: {
        type: "boolean"
      }
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
                  tag: module.exports.labelType()
                }
              }
            }
          }
        },
        attachments: module.exports.arrayType(module.exports.attachments()),
        status: module.exports.labelType(),
      }
    }
  },
  partner: function() {
    return {
      type: "object",
      properties: {
        ...module.exports.partnerProperties(),
        status: module.exports.labelType()
      }
    }
  },
  discount: function() {
    return {
      type: "object",
      properties: {
        ...module.exports.discountProperties(),
        status: module.exports.labelType(),
        partner: module.exports.partner(),
        type: module.exports.roleAndDiscountTypeProps(),
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
  pricing: function() {
    return {
      type: "object",
      properties: {
        ...module.exports.pricingProperties(),
        status: module.exports.labelType(),
      }
    }
  },
  memberships: function() {
    return {
      type: "object",
      properties: {
        id: {type: "string"},
        ...module.exports.date(),
        user: module.exports.user(),
        status: module.exports.labelType(),
        role: module.exports.labelType()  
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
      example
    }
  },
  defaultResponse: function() {
    return {
      default: {
        description: "Unexpected error",
        schema: {
          $ref: "#/definitions/Error"
        }
      }
    }
  },
  response201: function(description = null, definition = null){
    return {
      201: {
        description: description ? `${description}` : "Successful request.",
        schema: {
          $ref: `#/definitions/${definition?definition:"Success"}`
        }
      },
      ...module.exports.defaultResponse()
    }
  },
  response200: function(definition) {
    return {
      200: {
        description: "Successful request.",
        schema: {
          $ref: "#/definitions/"+definition
        }
      },
      ...module.exports.defaultResponse()
    }
  },
  bodyParam: function(description, definition) {
    return  [
      {
        name: "data",
        in: "body",
        description,
        required: true,
        schema: {
          $ref: "#/definitions/"+definition
        }
      }
    ]
  },
  param: function(name, how, type, required = true, description = null) {
    let param =  {
      name,
      in: how,
      type,
      required
    };
    if(description) param.description = description
    if(Array.isArray(type)){
      param["type"] = type[0]
      param = {...param, ...type[1]}
    }
    return [
      param
    ]
  }
}