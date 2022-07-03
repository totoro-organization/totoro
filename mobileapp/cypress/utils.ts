/**
 *
 * @param testId string to get
 * @param timeout timeout in ms
 * @returns cypress chainable object
 */
export function getByTestId(testId: string, timeout?: number) {
  return cy.get(`[data-testid=${testId}]`, { timeout });
}
