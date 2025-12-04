# WiseAdmit Sign-In Automation - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Verify Installation

All dependencies are already installed. Verify by running:

```bash
npm list cypress
```

### Step 2: Configure Your Credentials

**IMPORTANT**: You must update the credentials before running tests.

Open `cypress.env.json` and replace with your actual WiseAdmit credentials:

```json
{
  "TEST_EMAIL": "your-actual-email@example.com",
  "TEST_PASSWORD": "your-actual-password"
}
```

**Alternative**: Update `cypress/fixtures/users.json` with your valid credentials.

### Step 3: Run Your First Test

Open Cypress Test Runner to see the tests:

```bash
npm run cy:open
```

Or run all tests in headless mode:

```bash
npm test
```

## 📊 View Test Cases in Excel

An Excel file with all test cases has been generated:

- **File**: `WiseAdmit_SignIn_TestCases.xlsx`
- **Location**: Project root directory

To regenerate the Excel file:

```bash
npm run generate-excel
```

## 🧪 Running Specific Tests

### Run Only Positive Tests

```bash
npm run cy:run:positive
```

### Run Only Negative Tests

```bash
npm run cy:run:negative
```

### Run in Different Browsers

```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
```

## 📁 Project Structure Overview

```
wise-admit-automation/
├── cypress/
│   ├── e2e/
│   │   ├── signin-positive.cy.js    ← 5 positive test cases
│   │   └── signin-negative.cy.js    ← 10 negative test cases
│   ├── fixtures/
│   │   └── users.json               ← Test data
│   ├── pages/
│   │   ├── SignInPage.js            ← Sign-In POM
│   │   └── DashboardPage.js         ← Dashboard POM
│   └── support/
│       ├── commands.js              ← Custom commands
│       └── e2e.js                   ← Support file
├── cypress.config.js                ← Cypress config
├── cypress.env.json                 ← YOUR CREDENTIALS HERE
├── WiseAdmit_SignIn_TestCases.xlsx  ← Test case documentation
└── README.md                        ← Full documentation
```

## ✅ Test Coverage

### Positive Scenarios (5 tests)

- ✅ Valid credentials from fixture
- ✅ Valid credentials from environment
- ✅ Page elements visibility
- ✅ Successful login redirect
- ✅ Session persistence

### Negative Scenarios (10 tests)

- ✅ Empty email field
- ✅ Empty password field
- ✅ Both fields empty
- ✅ Invalid email format
- ✅ Wrong password
- ✅ Non-existent user
- ✅ Multiple invalid scenarios
- ✅ SQL injection prevention
- ✅ Special characters handling
- ✅ Password security

**Total: 15 automated test cases**

## 🔒 Security Features

- ✅ No hardcoded credentials in code
- ✅ Credentials stored in gitignored files
- ✅ Environment variable support
- ✅ SQL injection testing
- ✅ Password masking verification

## 📈 Test Reports

After running tests, view reports at:

- **HTML Report**: `cypress/reports/html/index.html`
- **Videos**: `cypress/videos/`
- **Screenshots**: `cypress/screenshots/` (on failure)

## 🎯 Page Object Model (POM)

### SignInPage Methods

```javascript
signInPage.visit(); // Navigate to sign-in
signInPage.enterEmail(email); // Enter email
signInPage.enterPassword(password); // Enter password
signInPage.clickSignIn(); // Click sign-in button
signInPage.signIn(email, password); // Complete flow
signInPage.verifyErrorMessage(); // Check errors
signInPage.verifySuccessfulLogin(); // Verify success
```

### DashboardPage Methods

```javascript
dashboardPage.verifyDashboardLoaded(); // Verify dashboard
dashboardPage.verifyUserProfileVisible(); // Check profile
```

## 🛠️ Troubleshooting

### Tests are failing?

1. ✅ Check credentials in `cypress.env.json`
2. ✅ Verify WiseAdmit website is accessible
3. ✅ Check if you've signed up on WiseAdmit
4. ✅ Run in headed mode to see what's happening: `npm run test:headed`

### Can't find elements?

1. Open Cypress Test Runner: `npm run cy:open`
2. Use the selector playground to find correct selectors
3. Update selectors in `cypress/pages/SignInPage.js`

### Need to update selectors?

Edit `cypress/pages/SignInPage.js` and update the `selectors` object:

```javascript
selectors = {
  emailInput: "your-new-selector",
  passwordInput: "your-new-selector",
  // ...
};
```

## 📞 Next Steps

1. **Update Credentials**: Update `cypress.env.json` with your actual credentials
2. **Run Tests**: Execute `npm run cy:open` to run tests interactively
3. **Review Reports**: Check test results and reports
4. **Customize**: Adjust selectors if needed based on actual application

## 📚 Additional Resources

- Full documentation: See `README.md`
- Test cases: Open `WiseAdmit_SignIn_TestCases.xlsx`
- Cypress docs: https://docs.cypress.io

---

**Ready to test?** Update your credentials and run: `npm run cy:open`
