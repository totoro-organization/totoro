import { API_ROUTES } from "../../support/routes";
import loginUserEmail from "../../fixtures/user/login-email.json";
import loginUserName from "../../fixtures/user/login-username.json";

// TODO: Add test when the user received an error.
describe("POST /login", () => {
  it("user connects with our email", () => {
    cy.request({
      method: "POST",
      url: API_ROUTES.LOGIN,
      body: loginUserEmail,
      headers: {
        "content-type": "application/json",
        app_id: "ad7258a1-bc27-4b04-882b-eeca86afcc7e",
      },
    }).then((response) => {
      expect(response.status).eq(201);
    });
  });

  it("user connects with our username", () => {
    cy.request({
      method: "POST",
      url: API_ROUTES.LOGIN,
      body: loginUserName,
      headers: {
        "content-type": "application/json",
        app_id: "ad7258a1-bc27-4b04-882b-eeca86afcc7e",
      },
    }).then((response) => {
      expect(response.status).eq(201);
    });
  });
});
