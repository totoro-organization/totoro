import { API_ROUTES, FRONTEND_BASE_URL } from "../support/routes";
import { getByTestId } from "../utils";

// FAKE DATA
const FAKE_USER = {
  email: "user@totoro.com",
  password: "123456",
  confirmPassword: "123456",
};

// TODO: WIPPPP
describe("Register page", () => {
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
      getByTestId("button-next", 20000).click();
    });

    // TODO: Add test when the user trigger an error message.
    // TODO: Check if the data stored on asyncStorage.
    context("First step", () => {
      it("checks if all inputs are empty", () => {
        getByTestId("button-next").click();
        getByTestId("button-register").click();

        getByTestId("input-email").should("be.empty");
        getByTestId("input-password").should("be.empty");
        getByTestId("input-confirm-password").should("be.empty");
      });

      it("autocompletes all inputs and validate form", () => {
        getByTestId("button-register").click();

        getByTestId("input-email").type(FAKE_USER.email);
        getByTestId("input-password").type(FAKE_USER.password);
        getByTestId("input-confirm-password").type(FAKE_USER.confirmPassword);

        getByTestId("button-next-step-one").click();
      });
    });
  });
});
