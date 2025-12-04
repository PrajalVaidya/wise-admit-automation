/**
 * Sign-In Test Suite - Negative Scenarios
 * Tests failed login scenarios with invalid/empty credentials
 */

import SignInPage from "../pages/SignInPage";

describe("Sign-In - Negative Test Cases", () => {
  const signInPage = new SignInPage();

  beforeEach(() => {
    // Clear session before each test
    cy.clearCookies();
    cy.clearLocalStorage();

    // Visit sign-in page
    signInPage.visit();
  });

  it("TC-006: Should show error for empty password field", () => {
    // Enter email but leave password empty
    signInPage.enterEmail(Cypress.env("TEST_EMAIL"));
    signInPage.clickSignIn();
    signInPage.clearPasswordField();

    // Wait a moment for any validation
    cy.wait(1000);

    // Verify user sees the validation message
    signInPage.verifyPasswordError();

    // Verify user stays on sign-in page (button might be disabled or no action)
    signInPage.verifyStayOnSignInPage();

    // Note: Password field might not show until email is validated
  });

  it("TC-007: Should show error when both fields are empty", () => {
    // Click sign-in without entering any credentials
    signInPage.enterEmail(Cypress.env("TEST_EMAIL"));
    signInPage.clickSignIn();
    signInPage.clearPasswordField();
    signInPage.clearEmailField();
    // Wait a moment
    cy.wait(1000);

    // Verify user sees validation messages for both email and password
    signInPage.verifyEmailError();
    signInPage.verifyPasswordError();

    // Verify user stays on sign-in page (form should not submit)
    signInPage.verifyStayOnSignInPage();
  });

  it("TC-008: Should show error for invalid email format", () => {
    // Enter invalid email format
    signInPage.enterEmail("invalid-email-format");
    signInPage.clickSignIn();

    // Wait for validation
    cy.wait(1000);

    // Verify user sees validation messages for email
    signInPage.verifyEmailError();

    // Verify user stays on sign-in page (invalid email should prevent progress)
    signInPage.verifyStayOnSignInPage();
  });

  it("TC-09: Should show error for wrong password", () => {
    cy.fixture("users").then((users) => {
      const wrongPasswordUser = users.invalidUsers.find(
        (user) => user.scenario === "Wrong password"
      );

      if (wrongPasswordUser) {
        signInPage.signIn(wrongPasswordUser.email, wrongPasswordUser.password);

        // Verify error message is displayed
        signInPage.verifyErrorMessage("Invalid Credentials");

        // Verify user stays on sign-in page
        signInPage.verifyStayOnSignInPage();
      }
    });
  });

  it("TC-010: Should show error for non-existent user", () => {
    cy.fixture("users").then((users) => {
      const nonExistentUser = users.invalidUsers.find(
        (user) => user.scenario === "Non-existent user"
      );

      if (nonExistentUser) {
        signInPage.enterEmail(nonExistentUser.email);
        signInPage.clickSignIn();

        // Verify error message is displayed
        signInPage.verifyErrorMessage("Failed to get student");

        // Verify user stays on sign-in page
        signInPage.verifyStayOnSignInPage();
      }
    });
  });

  it("TC-011: Should prevent SQL injection attempts", () => {
    const sqlInjectionAttempts = [
      "' OR '1'='1",
      "admin'--",
      "' OR '1'='1' --",
      "1' OR '1' = '1",
    ];

    sqlInjectionAttempts.forEach((injection) => {
      signInPage.clearForm();
      signInPage.enterEmail(injection);
      signInPage.clickSignIn();

      // Verify user is not logged in
      signInPage.verifyStayOnSignInPage();
    });
  });

  it("TC-012: Should handle special characters in credentials", () => {
    const specialCharsEmail = "test+special@example.com";
    const specialCharsPassword = "P@$$w0rd!#$%";

    signInPage.enterEmail(specialCharsEmail);
    signInPage.clickSignIn();
    signInPage.verifyEmailError();
  });
});
