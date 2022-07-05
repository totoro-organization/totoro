import Cypress from "cypress";
import { API_ROUTES } from "../../support/routes";

const FAKE_USER_EMAIL = "me@totoro.com";
const FAKE_USER_USERNAME = "rogerDu82";
const FAKE_USER_PASSWORD = "123456";

describe("POST /login", () => {
  it("user connects with our email", () => {
    const body = {
      emailOrUsername: FAKE_USER_EMAIL,
      password: FAKE_USER_PASSWORD,
    };
    cy.request({
      method: "POST",
      url: API_ROUTES.LOGIN,
      body: body,
      headers: {
        app_id: Cypress.env("APP_ID"),
      },
    }).should((response) => {
      expect(response.status).eq(201);
    });
  });

  it("user connects with our username", () => {
    const body = {
      emailOrUsername: FAKE_USER_USERNAME,
      password: FAKE_USER_PASSWORD,
    };

    cy.request({
      method: "POST",
      url: API_ROUTES.LOGIN,
      body: body,
    }).should((response) => {
      expect(response.status).eq(201);
    });
  });
});
