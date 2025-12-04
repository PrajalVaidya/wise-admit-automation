/**
 * Sign-In Test Suite - Positive Scenarios
 * Tests successful login scenarios with valid credentials
 */

import SignInPage from "../pages/SignInPage";
import DashboardPage from "../pages/DashboardPage";

describe("Sign-In - Positive Test Cases", () => {
  const signInPage = new SignInPage();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    // Clear session before each test
    cy.clearCookies();
    cy.clearLocalStorage();

    // Visit sign-in page
    signInPage.visit();
  });

  it("TC-001: Should successfully sign in with valid credentials from fixture", () => {
    // Load test data from fixture
    cy.fixture("users").then((users) => {
      const { email, password } = users.validUser;

      // Perform sign-in
      signInPage.signIn(email, password);

      // Verify successful login
      signInPage.verifySuccessfulLogin();

      // Verify dashboard loaded
      dashboardPage.verifyDashboardLoaded();
      dashboardPage.waitForDashboardLoad();

      // Verify dashboard elements
      dashboardPage.verifyWelcomeMessage();
      dashboardPage.verifyUserProfileVisible();
    });
  });

  it("TC-002: Should successfully sign in with valid credentials from environment variables", () => {
    // Get credentials from environment variables (cypress.env.json)
    const email = Cypress.env("TEST_EMAIL") || "test@example.com";
    const password = Cypress.env("TEST_PASSWORD") || "Test@123";

    // Perform sign-in
    signInPage.enterEmail(email);
    signInPage.clickSignIn();

    signInPage.enterPassword(password);
    signInPage.clickSignIn();

    // Verify successful login
    signInPage.verifySuccessfulLogin();
    dashboardPage.verifyDashboardLoaded();
    dashboardPage.verifyUserProfileVisible();
  });

  it("TC-003: Should display sign-in page elements correctly", () => {
    // Verify page elements are visible
    signInPage.waitForPageLoad();
    cy.get(signInPage.selectors.emailInput).should("be.visible");
    cy.get(signInPage.selectors.loginWithPhoneButton).should("be.visible");
    cy.get(signInPage.selectors.signUpLink).should("be.visible");

    // Verify welcome message
    signInPage.verifyWelcomeMessage();
  });

  it("TC-004: Should allow user to sign in and verify dashboard navigation", () => {
    cy.fixture("users").then((users) => {
      const { email, password } = users.validUser;

      // Sign in
      signInPage.signIn(email, password);

      // Wait for redirect and verify URL changed
      cy.url({ timeout: 10000 }).should("include", "/dashboard");

      // Verify dashboard elements
      dashboardPage.waitForDashboardLoad();
      dashboardPage.verifyNavigationLinks();
      dashboardPage.verifyApplicationSummary();
    });
  });

  it("TC-005: Should display user information after successful login", () => {
    cy.fixture("users").then((users) => {
      const { email, password } = users.validUser;

      // Sign in
      signInPage.signIn(email, password);

      // Verify successful login
      signInPage.verifySuccessfulLogin();

      // Verify dashboard loaded
      dashboardPage.verifyDashboardLoaded();
      dashboardPage.waitForDashboardLoad();

      // Verify user information is displayed
      dashboardPage.verifyUserName("Prajal Vaidya");
      dashboardPage.verifyWelcomeMessage();
      dashboardPage.verifyWiseScoreSection();
    });
  });
});
