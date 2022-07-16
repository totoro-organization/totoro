import { getByTestId } from "../utils";
import { FRONTEND_BASE_URL, API_ROUTES } from "./../support/routes";

// Fake data
const USER_EMAIL = "user@totoro.com";
const USER_PASSWORD = "123456";

// TODO: Add test when the user tries to submit the login form without filling all the inputs.
describe("Login Page", () => {
  it("redirects user to homepage if authenticated", () => {
    cy.intercept("GET", API_ROUTES.AUTH_USER_CONNECTED, {
      statusCode: 200,
    }).as("connected-user-request");

    cy.visit(FRONTEND_BASE_URL);

    cy.wait("@connected-user-request");
  });

  context("users is not authenticated", () => {
    beforeEach(() => {
      cy.intercept("GET", API_ROUTES.AUTH_USER_CONNECTED, {
        statusCode: 401,
      }).as("connected-user-request");

      cy.visit(FRONTEND_BASE_URL);

      cy.wait("@connected-user-request");

      // NOTE: The timeout here is to wait for the page to load
      // FIXME?
      getByTestId("button-next", 20000).click();
    });

    it("checks if the form is empty", () => {
      getByTestId("button-next", 20000).click();
      getByTestId("button-next").click();

      getByTestId("button-login").click();

      getByTestId("input-email").should("be.empty");
      getByTestId("input-password").should("be.empty");
    });

    it("autocompletes the login form and validate it", () => {
      getByTestId("button-next").click();

      getByTestId("button-login").click();

      getByTestId("input-email").type(USER_EMAIL);
      getByTestId("input-password").type(USER_PASSWORD);
      getByTestId("button-user-login").click();
    });
  });
});
