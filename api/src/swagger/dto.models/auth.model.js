module.exports = {
    loginUser: function(){
      return {
        type: "object",
        properties: {
          emailOrUsername: {
            type: "string"
          },
          password: {
            type: "string"
          }
        },
        required: [
          "emailOrUsername",
          "password"
        ],
        example: {
          emailOrUsername: "admin@test.fr",
          password: "xxxxxxx"
        }
      }
    },
    responseLogin: function(){
      return {
        type: "object",
        properties: {
          token: {
            type: "string"
          }
        }
      }
    },
    forgot: function(){
      return {
        type: "object",
        properties: {
          email: {
            type: "string"
          }
        },
        required: [
          "email"
        ],
        example: {
          email: "test@email.fr"
        }
      }
    },
    signup: function(){
      return {
        type: "object",
        properties: {
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
          password: {
            type: "string"
          }
        },
        required: [
          "username",
          "firstname",
          "lastname",
          "email",
          "password",
          "birthday"
        ],
        example: {
          username: "uber",
          firstname: "Quentin",
          lastname: "Huber",
          email: "h.quentin@totoro.fr",
          birthday: "2022-12-08",
          password: "123456"
        }
      }
    },
}