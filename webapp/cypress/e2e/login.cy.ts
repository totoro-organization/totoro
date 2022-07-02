import * as routes from '../support/routes';

// Fake data
const USER_EMAIL = 'user@user.user';
const USER_PASSWORD = '123456';

describe('Login page', () => {
  beforeEach(() => {
    cy.visit(routes.FRONTEND_ROUTES.LOGIN);
    cy.injectAxe();
  });

  it.skip('has no detectable a11y violations on load', () => {
    //TODO: 4 accessibility violations were detected
    cy.checkA11y();
  });

  context('User login', () => {
    it('checks empty inputs', () => {
      cy.get('input[name="emailOrUsername"]').should('be.empty');
      cy.get('input[name="password"]').should('be.empty');
    });

    it('autocompletes form', () => {
      cy.get('input[name="emailOrUsername"]').type(USER_EMAIL);
      cy.get('input[name="password"]').type(USER_PASSWORD);
    });

    // TODO: Add intercept call api.
  });
});
