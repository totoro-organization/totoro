import * as routes from '../support/routes';

describe('Login page', () => {
  beforeEach(() => {
    cy.visit(routes.FRONTEND_ROUTES.LOGIN);
    cy.injectAxe();
  });

  it('has no detectable a11y violations on load', () => {
    //TODO: 4 accessibility violations were detected
    cy.checkA11y();
  });

  // TODO: add login integration test.
});
