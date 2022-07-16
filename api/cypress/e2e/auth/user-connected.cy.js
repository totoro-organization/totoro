import { API_ROUTES } from "../../support/routes";
import userConnected from "../../fixtures/user/one.json";

// TODO: Add test when the user received an error.
describe("GET /connected", () => {
  beforeEach(() => {
    cy.login();
  });

  it("retrieves data from the connected user", () => {
    const token = window.localStorage.getItem("token");
    const authorization = `Bearer ${token}`;

    cy.request({
      method: "GET",
      url: API_ROUTES.USER_CONNECTED,
      headers: {
        "content-type": "application/json",
        app_id: "ad7258a1-bc27-4b04-882b-eeca86afcc7e",
        Authorization: authorization,
      },
    }).then((response) => {
      expect(response.status).eq(200);
      // FIXME
      // expect(response.body).eq(userConnected);
    });
  });
});
