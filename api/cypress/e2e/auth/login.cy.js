import { API_ROUTES } from "../../support/routes";

const FAKE_USER_EMAIL = "mae-test@mae.mae";
const FAKE_USER_USERNAME = "maem";
const FAKE_USER_PASSWORD = "123456";

// TODO: Add test when the user received an error.
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
        "content-type": "application/json",
        app_id: "ad7258a1-bc27-4b04-882b-eeca86afcc7e",
      },
    }).then((response) => {
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
      headers: {
        "content-type": "application/json",
        app_id: "ad7258a1-bc27-4b04-882b-eeca86afcc7e",
      },
    }).then((response) => {
      expect(response.status).eq(201);
    });
  });
});
