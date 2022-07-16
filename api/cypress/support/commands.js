const { API_ROUTES } = require("./routes");
import loginEmail from "../fixtures/user/login-email.json";

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: API_ROUTES.LOGIN,
    body: loginEmail,
    headers: {
      "content-type": "application/json",
      app_id: "ad7258a1-bc27-4b04-882b-eeca86afcc7e",
    },
  }).then((response) => {
    window.localStorage.setItem("token", response.body.token);
    expect(response.status).eq(201);
  });
});
