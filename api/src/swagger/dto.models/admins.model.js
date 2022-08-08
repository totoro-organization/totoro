const {labelType, date, adminProperties, arrayType} = require("../generique/index");

module.exports = {
  getAdmin: function(){
    return {
      type: "object",
      properties: {
        ...adminProperties(),
        ...date(),
        status: labelType(),
        role: labelType()
      }
    }
  },
  getAllAdmins: function(){
    return arrayType(module.exports.getAdmin())
  },
  postAdmin: function(){
    return {
      type: "object",
      properties: {
        firstname: {
          type: "string"
        },
        lastname: {
          type: "string"
        },
        username: {
          type: "string"
        },
        email: {
          type: "string"
        },
        role_id: {
          type: "string"
        }
      },
      required: [
        "firstname",
        "lastname",
        "username",
        "email",
        "role_id"
      ],
      example: {
        username: "uber",
        firstname: "Quentin",
        lastname: "Huber",
        email: "h.quentin@totoro.fr",
        role_id: "1dc4364b-d3d1-4db4-a324-a1271e59dfb1"
      }
    }
  },
  putAdmin: function(){
    return {
      type: "object",
      properties: {
        firstname: {
          type: "string"
        },
        lastname: {
          type: "string"
        },
        email: {
          type: "string"
        }
      },
      example: {
        firstname: "Quentin",
        lastname: "Huber",
        email: "h.quentin@totoro.fr"
      }
    }
  },
  putPasswordAdmin: function () {
    return {
      type: "object",
      properties: {
        old_password: {
          type: "string"
        },
        password: {
          type: "string"
        }
      },
      required: [
        "old_password",
        "password"
      ],
      example: {
        old_password: "123456",
        password: "111111"
      }
    }
  },
  getLogsAdmin: function () {
    return arrayType(
      {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          table: {
            type: "string"
          },
          action: {
            type: "string"
          },
          ...date(),
          admin_id: {
            type: "string"
          }
        }
      }
    )
  },
  getLogsAdmins: function(){
    return arrayType(
      {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          table: {
            type: "string"
          },
          action: {
            type: "string"
          },
          ...date(),
          admin: module.exports.getAdmin()
        }
      }
    )
  },
  postLogAdmin: function(){
    return {
      type: "object",
      properties: {
        table: {
          type: "string"
        },
        action: {
          type: "string"
        }
      },
      required: [
        "table",
        "action"
      ],
      example: {
        table: "Users",
        action: "Deleted"
      }
    }
  },
  putRoleAdmin: function(){
    return {
      type: "object",
      properties: {
        role_id: {
          type: "string"
        }
      },
      required: [
        "role_id"
      ],
      example: {
        role_id: "1dc4364b-d3d1-4db4-a324-a1271e59dfb1"
      }
    }
  },
}