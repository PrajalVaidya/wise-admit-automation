// ***********************************************
// This file contains custom Cypress commands
// and overrides existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to login with credentials from environment variables
Cypress.Commands.add("login", (email, password) => {
  cy.get('[data-testid="email-input"]').clear().type(email);
  cy.get('[data-testid="password-input"]').clear().type(password);
  cy.get('[data-testid="signin-button"]').click();
});

// Custom command to check if user is logged in
Cypress.Commands.add("isLoggedIn", () => {
  cy.url().should("not.include", "/sign-in");
});

// Custom command to clear session storage and cookies
Cypress.Commands.add("clearSession", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});
