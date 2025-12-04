# WiseAdmit Sign-In Automation Test Suite

## Overview

This project contains automated test cases for the **WiseAdmit ApplyNow Sign-In** functionality using **Cypress** and the **Page Object Model (POM)** design pattern.

The test suite validates the **two-step sign-in flow** of WiseAdmit, including positive scenarios (successful login) and negative scenarios (validation errors, invalid credentials, security tests).

## 🎯 Project Objectives

- Automate Sign-In flow with positive and negative test scenarios
- Implement Page Object Model (POM) for maintainable test code
- Test two-step authentication flow (email → password)
- Secure credential management (no hardcoded credentials)
- Generate comprehensive test reports and documentation
- Validate dashboard navigation and user information display

## 📁 Project Structure

```
wise-admit-automation/
├── cypress/
│   ├── e2e/
│   │   ├── signin-positive.cy.js    # 5 Positive test scenarios
│   │   └── signin-negative.cy.js    # 7 Negative test scenarios
│   ├── fixtures/
│   │   └── users.json               # Test data (credentials)
│   ├── pages/
│   │   ├── SignInPage.js            # Sign-In Page Object Model
│   │   └── DashboardPage.js         # Dashboard Page Object Model
│   ├── support/
│   │   ├── commands.js              # Custom Cypress commands
│   │   └── e2e.js                   # Support file
│   └── reports/                     # Test reports (generated)
├── cypress.config.js                # Cypress configuration
├── cypress.env.json                 # Environment variables (gitignored)
├── generate-test-cases-excel.js    # Excel report generator
├── WiseAdmit_SignIn_TestCases.xlsx  # Test cases documentation
├── package.json                     # Project dependencies
├── .gitignore                       # Git ignore file
└── README.md                        # This file
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Valid WiseAdmit account

### Installation

1. **Clone or navigate to the project directory:**

   ```bash
   cd c:\Projects\wise-admit-automation
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure credentials:**

   - Open `cypress.env.json`
   - Update with your valid WiseAdmit credentials:
     ```json
     {
       "TEST_EMAIL": "your-email@example.com",
       "TEST_PASSWORD": "your-password"
     }
     ```
   - **Note**: This file is gitignored to prevent credential exposure

4. **Alternatively, update test data in `cypress/fixtures/users.json`:**
   ```json
   {
     "validUser": {
       "email": "your-email@example.com",
       "password": "your-password"
     }
   }
   ```

## 🧪 Running Tests

### Open Cypress Test Runner (Interactive Mode - Recommended)

```bash
npm run cy:open
```

Then select:

- E2E Testing
- Choose your browser (Chrome recommended)
- Click on a test file to run

### Run All Tests (Headless Mode)

```bash
npm test
```

### Run Specific Test Suites

```bash
# Run only positive test cases
npm run cy:run:positive

# Run only negative test cases
npm run cy:run:negative
```

### Run Tests in Different Browsers

```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# Edge
npm run test:edge
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

## 📊 Test Reports

### HTML Reports

After running tests, reports are generated in:

- **HTML Report**: `cypress/reports/html/index.html`
- **JSON Report**: `cypress/reports/json/`
- **Screenshots**: `cypress/screenshots/` (on failure)
- **Videos**: `cypress/videos/` (if enabled)

### Excel Documentation

Generate/update Excel test case documentation:

```bash
npm run generate:excel
```

This creates `WiseAdmit_SignIn_TestCases.xlsx` with:

- All test cases with detailed steps
- Color-coded by type and priority
- Summary sheet with statistics

## 📝 Test Cases

### Summary

- **Total Test Cases**: 12
- **Positive Tests**: 5
- **Negative Tests**: 7
- **Automation Coverage**: 100%

### Positive Test Cases (signin-positive.cy.js)

| Test ID | Description                                       | Expected Result                                                                                                                             |
| ------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| TC-001  | Sign in with valid credentials from fixture       | User logged in, redirected to /dashboard, profile visible, name: "Prajal Vaidya"                                                            |
| TC-002  | Sign in with valid credentials from env variables | User logged in, redirected to dashboard, profile visible                                                                                    |
| TC-003  | Verify sign-in page elements                      | Email input, "Login with phone" button, "Create Account" link, welcome message visible                                                      |
| TC-004  | Verify dashboard navigation after login           | URL: /dashboard, all nav links visible (Dashboard, Profile, Documents, Applications, Universities, WiseScore), application summary displays |
| TC-005  | Verify user information display                   | User name: "Prajal Vaidya", welcome message, WiseScore: 0%, avatar visible                                                                  |

### Negative Test Cases (signin-negative.cy.js)

| Test ID | Description                 | Expected Result                                       |
| ------- | --------------------------- | ----------------------------------------------------- |
| TC-006  | Empty password field        | Password validation error, user stays on sign-in page |
| TC-007  | Both fields empty           | Email and password validation errors displayed        |
| TC-008  | Invalid email format        | Email error: "Invalid Email", user stays on page      |
| TC-009  | Wrong password              | Error: "Invalid Credentials", user stays on page      |
| TC-010  | Non-existent user           | Error: "Failed to get student", user stays on page    |
| TC-011  | SQL injection prevention    | Injection prevented, no login, no DB errors           |
| TC-012  | Special characters in email | Email validation error, handled gracefully            |

## 🏗️ Page Object Model (POM)

### SignInPage.js

**Two-Step Sign-In Flow:**

1. Enter email → Click "Log in"
2. Enter password → Click "Log in"
3. Redirect to dashboard

**Key Methods:**

- `visit()` - Navigate to sign-in page and wait for load
- `waitForPageLoad()` - Wait for page to fully load
- `enterEmail(email)` - Enter email address
- `clickSignIn()` - Click "Log in" button
- `enterPassword(password)` - Enter password (waits for field to appear)
- `signIn(email, password)` - Complete two-step sign-in flow
- `verifyWelcomeMessage()` - Verify "Welcome back, future grads!" message
- `verifyErrorMessage(expectedMessage)` - Verify error messages
- `verifyEmailError()` - Verify email validation error
- `verifyPasswordError()` - Verify password validation error
- `verifySuccessfulLogin()` - Verify successful login
- `clearEmailField()` - Clear email input
- `clearPasswordField()` - Clear password input

**Selectors (MUI-based):**

```javascript
emailInput: 'input[autocomplete="username"]';
passwordInput: 'input[type="password"]';
signInButton: 'button[type="submit"]:contains("Log in")';
loginWithPhoneButton: 'button:contains("Login with phone")';
welcomeMessage: 'span:contains("Welcome back")';
signUpLink: 'span:contains("Create Account")';
errorMessage: ".MuiTypography-root.MuiTypography-body2";
emailError: 'p:contains("Invalid Email")';
invalidCredentials: 'p:contains("Invalid Credentials")';
```

### DashboardPage.js

**Key Methods:**

- `verifyDashboardLoaded()` - Verify URL contains /dashboard
- `waitForDashboardLoad()` - Wait for dashboard to fully load
- `verifyUserProfileVisible()` - Check user avatar is visible
- `verifyUserName(userName)` - Verify user name displays
- `verifyWelcomeMessage()` - Verify "Welcome to WiseAdmit!" message
- `verifyNavigationLinks()` - Verify all nav links visible
- `verifyApplicationSummary()` - Verify application summary section
- `verifyWiseScoreSection()` - Verify WiseScore section visible
- `clickDashboard()`, `clickProfile()`, `clickDocuments()`, etc. - Navigation methods

**Dashboard Elements:**

```javascript
dashboardLink: 'a[href="/dashboard"]';
profileLink: 'a[href="/dashboard/profile"]';
documentsLink: 'a[href="/dashboard/documents"]';
applicationsLink: 'a[href="/dashboard/applications"]';
universitiesLink: 'a[href="/dashboard/universitiesandprograms"]';
wiseScoreLink: 'a[href="/dashboard/wisescore"]';
userAvatar: 'img[alt="User Avatar"]';
userName: "span.MuiTypography-body3";
welcomeText: 'span:contains("Welcome to WiseAdmit!")';
```

## 🔒 Security Best Practices

1. **No Hardcoded Credentials**: All credentials stored in `cypress.env.json` (gitignored)
2. **Environment Variables**: Use `Cypress.env()` to access credentials
3. **Fixtures**: Test data separated in `fixtures/users.json`
4. **Password Security**: Password fields use `type="password"`
5. **SQL Injection Tests**: Validates injection prevention
6. **Error Messages**: Verifies appropriate error messages without exposing sensitive info

## 📋 Test Data Management

### Using Environment Variables

```javascript
const email = Cypress.env("TEST_EMAIL");
const password = Cypress.env("TEST_PASSWORD");
```

### Using Fixtures

```javascript
cy.fixture("users").then((users) => {
  const { email, password } = users.validUser;
  signInPage.signIn(email, password);
});
```

### Current Test Data

```json
{
  "validUser": {
    "email": "prajalvaidya200011@gmail.com",
    "password": "Prajal@123"
  },
  "invalidUsers": [
    {
      "scenario": "Invalid email format",
      "email": "invalid-email",
      "expectedError": "Invalid email format"
    },
    {
      "scenario": "Wrong password",
      "email": "prajalvaidya200011@gmail.com",
      "password": "WrongPassword123",
      "expectedError": "Invalid credentials"
    },
    {
      "scenario": "Non-existent user",
      "email": "nonexistent@example.com",
      "expectedError": "User not found"
    }
  ]
}
```

## 🛠️ Configuration

### Cypress Configuration (cypress.config.js)

```javascript
{
  baseUrl: "https://www.wiseadmit.io/",
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  watchForFileChanges: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000
}
```

### Key Settings

- **Base URL**: `https://www.wiseadmit.io/`
- **Sign-In Path**: `/applynow`
- **Dashboard Path**: `/dashboard`
- **Viewport**: 1920x1080 (Full HD)
- **Video Recording**: Disabled (for faster execution)

## 🎯 Two-Step Sign-In Flow

WiseAdmit uses a two-step authentication process:

```
Step 1: Email Entry
├── User enters email
├── Clicks "Log in" button
└── Password field appears/activates

Step 2: Password Entry
├── User enters password
├── Clicks "Log in" button
└── Redirects to /dashboard on success

Post-Login Verification
├── URL changes to /dashboard
├── Welcome message displays
├── User profile loads
├── Navigation links appear
└── Application summary shows
```

## 🐛 Troubleshooting

### Tests Failing

1. **Verify credentials** in `cypress.env.json` are correct
2. **Check WiseAdmit website** is accessible at `https://www.wiseadmit.io/applynow`
3. **Update selectors** if UI has changed (use Cypress selector playground)
4. **Check browser compatibility** (Chrome recommended)
5. **Verify two-step flow** - ensure password field appears after email entry

### Cannot Find Elements

1. Open Cypress Test Runner: `npm run cy:open`
2. Use Cypress selector playground (click target icon)
3. Find correct selectors for elements
4. Update selectors in `SignInPage.js` or `DashboardPage.js`

### Common Issues

**Issue**: Password field not found

- **Solution**: Ensure you click "Log in" after entering email to trigger password field

**Issue**: Tests timeout

- **Solution**: Increase `defaultCommandTimeout` in `cypress.config.js`

**Issue**: Wrong error messages

- **Solution**: Update expected error messages in test cases to match actual application

## 📞 Support & Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model Pattern](https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Logging-In-Controlling-State)
- [WiseAdmit Website](https://www.wiseadmit.io)

## 📄 Documentation Files

- `README.md` - This file (project overview and setup)
- `QUICKSTART.md` - Quick start guide
- `PROJECT_SUMMARY.md` - Detailed project summary
- `TEST_EXECUTION_CHECKLIST.md` - Test execution checklist
- `WiseAdmit_SignIn_TestCases.xlsx` - Excel test case documentation

## 🎉 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Update credentials in cypress.env.json
# Edit the file with your WiseAdmit credentials

# 3. Run tests in interactive mode
npm run cy:open

# 4. Select a test file and watch it run!
```

---

## 📊 Test Statistics

- **Total Test Cases**: 12
- **Positive Tests**: 5 (42%)
- **Negative Tests**: 7 (58%)
- **Critical Priority**: 1 (SQL Injection)
- **High Priority**: 8
- **Medium Priority**: 3
- **Automation Coverage**: 100%
- **Framework**: Cypress
- **Design Pattern**: Page Object Model (POM)

---

**Last Updated**: December 5, 2025

**Status**: ✅ All tests passing with actual WiseAdmit application

**Note**: Before running tests, ensure you have a valid WiseAdmit account and have updated the credentials in `cypress.env.json` or `cypress/fixtures/users.json`.

**Five things that could break the Sign-In process in the future.**

## 1. UI Framework Upgrade or Redesign

- **Risk:** Updating MUI or redesigning the UI may break current selectors.
- **Current Situation:** Selectors like `.MuiTypography-root` and text-based matches such as `:contains("Log in")` are fragile.
- **Mitigation:**
  - Add `data-testid` attributes to elements.
  - Use multiple fallback selectors to ensure stability.

---

## 2. Authentication Flow Modifications

- **Risk:** The login flow could change (single-step login, MFA, or different input sequence).
- **Current Process:** Email → Continue → Password → Login
- **Mitigation:**
  - Implement flexible logic for authentication.
  - Handle conditional flows and optional steps in tests.

---

## 3. API / Backend Behavior Changes

- **Risk:** API responses, error messages, or validation rules could change.
- **Current Concern:** Error strings like `"Invalid Credentials"` or `"Failed to get student"` may not be consistent.
- **Mitigation:**
  - Use partial text matching instead of exact messages.
  - Validate functionality rather than exact string content.

---

## 4. Dynamic Auto-Generated Element IDs

- **Risk:** MUI generates dynamic IDs such as `id=":r2:"` which change on every deployment.
- **Current Problem:** These IDs cannot be used as stable selectors.
- **Mitigation:**
  - Avoid using dynamic IDs in tests.
  - Use stable attributes like `data-testid` or predictable class names.

---

## 5. Third-Party Service Dependencies

- **Risk:** Services such as CAPTCHA, analytics scripts, or CDNs may interfere with automated tests.
- **Current State:** CAPTCHA is not yet implemented, but could be added later.
- **Mitigation:**
  - Use a test environment without these restrictions.
  - Employ network stubbing or mocks where necessary.

---

**Five improvements for the website.**

## 1. Add Test Automation Attributes

- **Improvement:** Add `data-testid` attributes to all interactive elements.
- **Benefit:** Makes automated tests significantly more robust and less prone to breaking when styles or structure change.
- **Implementation:** `<input data-testid="email-input" ... />` instead of relying on generic classes.

---

## 2. Improve Error Messages and Validation Feedback

- **Improvement:** Provide specific, actionable error messages and real-time validation.
- **Benefit:** Enhances user experience by clearly explaining what went wrong (e.g., "Invalid email format" vs "Error").
- **Implementation:** Use `aria-live` regions for errors and validate input formats as the user types.

---

## 3. Implement Progressive Enhancement for Sign-In Flow

- **Improvement:** Show both email and password fields initially or provide a clear visual progress indicator.
- **Benefit:** Reduces user confusion about the multi-step process and ensures functionality even if JavaScript fails.
- **Implementation:** Display disabled password field that enables after valid email entry.

---

## 4. Add "Remember Me" and Social Login Options

- **Improvement:** Include a "Remember Me" checkbox and options to log in via Google/LinkedIn.
- **Benefit:** Increases user convenience and reduces friction for returning users.
- **Implementation:** Standard OAuth integrations and persistent session tokens.

---

## 5. Enhance Security and User Account Protection

- **Improvement:** Display password requirements, add "Forgot Password" link, and implement account lockout warnings.
- **Benefit:** Builds user trust and secures accounts against unauthorized access.
- **Implementation:** Show password strength meter and clear links for account recovery.
