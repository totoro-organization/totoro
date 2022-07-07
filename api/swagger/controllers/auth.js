const {response201, bodyParam, defaultResponse} = require("../generique");

module.exports = {
    "/api/auth/login": {
        post: {
          tags: [
            "Authentification"
          ],
          "x-swagger-router-controller": "auth",
          operationId: "login",
          parameters: [
            ...bodyParam("Login user", "loginUser")
          ],
          responses: response201("User logged")
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
            ...bodyParam("Login admin", "loginUser")
          ],
          responses: response201("Admin logged", "responseLogin")
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
            ...bodyParam("create an account", "signup")
          ],
          responses: response201("User created")
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
            ...bodyParam("Forgot password", "forgot")
          ],
          responses: response201("Forgot your password")
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
            ...defaultResponse()
          }
        }
    },
}