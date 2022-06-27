module.exports = {
    "/api/auth/login": {
        post: {
          tags: [
            "Authentification"
          ],
          "x-swagger-router-controller": "auth",
          operationId: "login",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Login user",
              required: true,
              schema: {
                $ref: "#/definitions/loginUser"
              }
            }
          ],
          responses: {
            201: {
              description: "User logged",
              schema: {
                $ref: "#/definitions/responseLogin"
              }
            },
            default: {
              description: "Unexpected error",
              schema: {
                $ref: "#/definitions/Error"
              }
            }
          }
        }
    },
    "/api/auth/login/admin": {
        post: {
          tags: [
            "Authentification"
          ],
          "x-swagger-router-controller": "auth",
          operationId: "loginAmin",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Login admin",
              required: true,
              schema: {
                $ref: "#/definitions/loginUser"
              }
            }
          ],
          responses: {
            201: {
              description: "Admin logged",
              schema: {
                $ref: "#/definitions/responseLogin"
              }
            },
            default: {
              description: "Unexpected error",
              schema: {
                $ref: "#/definitions/Error"
              }
            }
          }
        }
    },
    "/api/auth/signup": {
        post: {
          tags: [
            "Authentification"
          ],
          "x-swagger-router-controller": "auth",
          operationId: "signup",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "create an account",
              required: true,
              schema: {
                $ref: "#/definitions/signup"
              }
            }
          ],
          responses: {
            201: {
              description: "User created",
              schema: {
                $ref: "#/definitions/Success"
              }
            },
            default: {
              description: "Unexpected error",
              schema: {
                $ref: "#/definitions/Error"
              }
            }
          }
        }
    },
    "/api/auth/forgot": {
        post: {
          tags: [
            "Authentification"
          ],
          "x-swagger-router-controller": "auth",
          operationId: "forgot",
          parameters: [
            {
              name: "data",
              in: "body",
              description: "Forgot password",
              required: true,
              schema: {
                $ref: "#/definitions/forgot"
              }
            }
          ],
          responses: {
            201: {
              description: "Forgot your password",
              schema: {
                $ref: "#/definitions/Success"
              }
            },
            default: {
              description: "Unexpected error",
              schema: {
                $ref: "#/definitions/Error"
              }
            }
          }
        }
    },
    "/api/auth/connected": {
        get: {
          tags: [
            "Authentification"
          ],
          "x-swagger-router-controller": "auth",
          operationId: "connected",
          parameters: [],
          responses: {
            201: {
              description: "get user connected (getAdmin or getUser model)"
            },
            default: {
              description: "Unexpected error",
              schema: {
                $ref: "#/definitions/Error"
              }
            }
          }
        }
    },
}