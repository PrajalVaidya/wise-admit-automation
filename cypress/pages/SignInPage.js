/**
 * Page Object Model for Sign-In Page
 * Contains all locators and methods related to the Sign-In functionality
 */

class SignInPage {
  // Page URL
  url = "applynow";

  // Locators - Based on actual WiseAdmit sign-in page structure
  selectors = {
    // Email input field - MUI FilledInput with autocomplete="username"
    emailInput:
      'input[autocomplete="username"], input[name="email"], input[placeholder*="Email"]',

    // Password input field - will appear after email is entered
    passwordInput:
      'input[type="password"], input[autocomplete="current-password"], input[name="password"]',

    // Sign-in button - disabled until email is entered
    signInButton:
      'button[type="submit"]:contains("Log in"), .sign-in-form button[type="submit"]',

    // Login with phone button
    loginWithPhoneButton: 'button:contains("Login with phone")',

    // Page title
    pageTitle:
      'span:contains("Log in"), .MuiTypography-root:contains("Log in")',

    // Welcome message
    welcomeMessage: 'span:contains("Welcome back")',

    // Create account link
    signUpLink:
      'span:contains("Create Account"), .MuiTypography-root:contains("Create Account")',

    // Error messages (MUI typically shows errors below inputs or in alerts)
    errorMessage: ".MuiTypography-root.MuiTypography-body2",
    emailError: 'p:contains("Invalid Email")',
    passwordError: ".MuiFormHelperText-root.Mui-error",
    invalidCredentials: 'p:contains("Invalid Credentials")',
    // Form container
    signInForm: "form.sign-in-form, .sign-in-form",

    // Email label
    emailLabel: 'label:contains("Email")',

    // Divider text
    dividerText: 'span:contains("Or login with email")',
  };

  /**
   * Navigate to Sign-In page
   */
  visit() {
    cy.visit(this.url);
    cy.url().should("include", this.url);
    // Wait for the sign-in form to load
    cy.get(this.selectors.signInForm, { timeout: 10000 }).should("be.visible");
  }

  /**
   * Wait for page to fully load
   */
  waitForPageLoad() {
    cy.get(this.selectors.pageTitle, { timeout: 10000 }).should("be.visible");
    cy.get(this.selectors.emailInput, { timeout: 10000 }).should("be.visible");
    return this;
  }

  /**
   * Click "Login with phone" button
   */
  clickLoginWithPhone() {
    cy.get(this.selectors.loginWithPhoneButton).click();
    return this;
  }

  /**
   * Verify welcome message is displayed
   */
  verifyWelcomeMessage() {
    cy.get(this.selectors.welcomeMessage).should("be.visible");
    return this;
  }

  /**
   * Enter email address
   * @param {string} email - Email address to enter
   */
  enterEmail(email) {
    cy.get(this.selectors.emailInput).clear().type(email);
    return this;
  }

  /**
   * Enter password
   * @param {string} password - Password to enter
   */
  enterPassword(password) {
    // Wait for password field to be available (might appear after email)
    cy.get(this.selectors.passwordInput, { timeout: 5000 }).should(
      "be.visible"
    );
    cy.get(this.selectors.passwordInput).clear().type(password);
    return this;
  }

  /**
   * Clears password Field
   */
  clearPasswordField() {
    // Wait for password field to be available (might appear after email)
    cy.get(this.selectors.passwordInput, { timeout: 5000 }).should(
      "be.visible"
    );
    cy.get(this.selectors.passwordInput).clear();
    return this;
  }

  /**
   * Clears email Field
   */
  clearEmailField() {
    cy.get(this.selectors.emailInput).clear();
    return this;
  }

  /**
   * Click Sign-In button
   */
  clickSignIn() {
    cy.get(this.selectors.signInButton).click();
    return this;
  }

  /**
   * Complete sign-in flow with credentials
   * @param {string} email - Email address
   * @param {string} password - Password
   */
  signIn(email, password) {
    this.enterEmail(email);
    // Wait a moment for any validation or UI updates
    cy.wait(500);
    this.clickSignIn();
    // Wait for the password field to pop up
    cy.wait(500);
    this.enterPassword(password);
    cy.wait(500);
    this.clickSignIn();
    return this;
  }

  /**
   * Get error message element
   */
  getErrorMessage() {
    return cy.get(this.selectors.errorMessage);
  }

  /**
   * Get email error element
   */
  getEmailError() {
    return cy.get(this.selectors.emailError);
  }

  /**
   * Get password error element
   */
  getPasswordError() {
    return cy.get(this.selectors.passwordError);
  }

  /**
   * Verify error message is displayed
   * @param {string} expectedMessage - Expected error message text
   */
  verifyErrorMessage(expectedMessage) {
    this.getErrorMessage().should("be.visible");
    if (expectedMessage) {
      this.getErrorMessage().should("contain", expectedMessage);
    }
    return this;
  }

  /**
   * Verify email field error
   * @param {string} expectedMessage - Expected error message
   */
  verifyEmailError(expectedMessage) {
    this.getEmailError().should("be.visible");
    if (expectedMessage) {
      this.getEmailError().should("contain", expectedMessage);
    }
    return this;
  }

  /**
   * Verify password field error
   * @param {string} expectedMessage - Expected error message
   */
  verifyPasswordError(expectedMessage) {
    this.getPasswordError().should("be.visible");
    if (expectedMessage) {
      this.getPasswordError().should("contain", expectedMessage);
    }
    return this;
  }

  verifyInvalidCredentials(expectedMessage) {
    this.getErrorMessage().should("be.visible");
    if (expectedMessage) {
      this.getErrorMessage().should("contain", expectedMessage);
    }
    return this;
  }

  /**
   * Verify successful login by checking URL change
   */
  verifySuccessfulLogin() {
    cy.url().should("not.include", this.url);
    // Wait for redirect to complete
    cy.url().should("not.equal", Cypress.config().baseUrl + this.url);
    return this;
  }

  /**
   * Verify user remains on sign-in page (failed login)
   */
  verifyStayOnSignInPage() {
    cy.url().should("include", this.url);
    return this;
  }

  /**
   * Click Sign-Up link
   */
  clickSignUpLink() {
    cy.get(this.selectors.signUpLink).click();
    return this;
  }

  /**
   * Verify page title
   * @param {string} expectedTitle - Expected page title
   */
  verifyPageTitle(expectedTitle) {
    cy.get(this.selectors.pageTitle).should("contain", expectedTitle);
    return this;
  }

  /**
   * Verify Sign-In button is enabled
   */
  verifySignInButtonEnabled() {
    cy.get(this.selectors.signInButton).should("not.be.disabled");
    return this;
  }

  /**
   * Verify Sign-In button is disabled
   */
  verifySignInButtonDisabled() {
    cy.get(this.selectors.signInButton).should("be.disabled");
    return this;
  }

  /**
   * Clear all form fields
   */
  clearForm() {
    cy.get(this.selectors.emailInput).clear();
    // Only clear password if it exists
    cy.get("body").then(($body) => {
      if ($body.find(this.selectors.passwordInput).length > 0) {
        cy.get(this.selectors.passwordInput).clear();
      }
    });
    return this;
  }
}

export default SignInPage;
