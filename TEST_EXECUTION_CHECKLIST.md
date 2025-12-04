# Test Execution Checklist

## Pre-Execution Checklist

### ✅ Setup Verification

- [ ] Node.js installed (v14+)
- [ ] Dependencies installed (`npm install` completed)
- [ ] Cypress installed successfully
- [ ] Project structure verified

### ✅ Credential Configuration

- [ ] Signed up on WiseAdmit ApplyNow with valid credentials
- [ ] Updated `cypress.env.json` with actual email and password
- [ ] OR Updated `cypress/fixtures/users.json` with valid credentials
- [ ] Verified credentials are not hardcoded in test files

### ✅ Application Access

- [ ] WiseAdmit ApplyNow website is accessible
- [ ] Can manually login with test credentials
- [ ] Sign-in page URL is correct in `cypress.config.js`

## Test Execution Steps

### 1. Interactive Test Execution (Recommended for First Run)

```bash
npm run cy:open
```

- [ ] Cypress Test Runner opened
- [ ] Select E2E Testing
- [ ] Choose browser (Chrome recommended)
- [ ] Click on test file to run
- [ ] Observe test execution

### 2. Headless Test Execution

```bash
npm test
```

- [ ] All tests executed
- [ ] Test results displayed in terminal
- [ ] Videos recorded in `cypress/videos/`
- [ ] Screenshots captured on failures

### 3. Specific Test Suite Execution

```bash
# Positive tests only
npm run cy:run:positive

# Negative tests only
npm run cy:run:negative
```

## Post-Execution Checklist

### ✅ Results Verification

- [ ] Check test results in terminal
- [ ] Review HTML report: `cypress/reports/html/index.html`
- [ ] Check videos: `cypress/videos/`
- [ ] Review screenshots (if any failures): `cypress/screenshots/`

### ✅ Test Coverage Verification

- [ ] All 5 positive test cases executed
- [ ] All 10 negative test cases executed
- [ ] Total 15 test cases completed

### ✅ Documentation

- [ ] Test results documented
- [ ] Excel file reviewed: `WiseAdmit_SignIn_TestCases.xlsx`
- [ ] Failures (if any) logged and analyzed

## Expected Test Results

### Positive Test Cases (Should PASS)

- [x] TC-001: Valid credentials from fixture
- [x] TC-002: Valid credentials from environment
- [x] TC-003: Page elements visibility
- [x] TC-004: Successful login redirect
- [x] TC-005: Session persistence

### Negative Test Cases (Should PASS - meaning errors are properly shown)

- [x] TC-006: Empty email field
- [x] TC-007: Empty password field
- [x] TC-008: Both fields empty
- [x] TC-009: Invalid email format
- [x] TC-010: Wrong password
- [x] TC-011: Non-existent user
- [x] TC-012: Multiple invalid scenarios
- [x] TC-013: SQL injection prevention
- [x] TC-014: Special characters handling
- [x] TC-015: Password security

## Troubleshooting

### If Tests Fail

#### Authentication Failures

- [ ] Verify credentials in `cypress.env.json` are correct
- [ ] Try manual login with same credentials
- [ ] Check if account is active/verified
- [ ] Verify email format is correct

#### Element Not Found Errors

- [ ] Open test in headed mode: `npm run test:headed`
- [ ] Use Cypress Test Runner to inspect elements
- [ ] Update selectors in `cypress/pages/SignInPage.js`
- [ ] Check if WiseAdmit UI has changed

#### Timeout Errors

- [ ] Check internet connection
- [ ] Verify WiseAdmit website is accessible
- [ ] Increase timeout in test if needed
- [ ] Check if website is slow to respond

#### Network Errors

- [ ] Verify internet connection
- [ ] Check if behind proxy/firewall
- [ ] Try different network
- [ ] Check if WiseAdmit is down

## Test Execution Report Template

### Test Execution Summary

- **Date**: ********\_********
- **Executed By**: ********\_********
- **Environment**: Production / Staging
- **Browser**: Chrome / Firefox / Edge
- **Total Tests**: 15
- **Passed**: **\_**
- **Failed**: **\_**
- **Skipped**: **\_**
- **Pass Rate**: **\_**%

### Failed Test Cases (if any)

| Test ID | Test Name | Failure Reason | Screenshot | Notes |
| ------- | --------- | -------------- | ---------- | ----- |
|         |           |                |            |       |

### Notes & Observations

---

---

---

### Recommendations

---

---

---

## Sign-Off

- [ ] All tests executed successfully
- [ ] Test results documented
- [ ] Reports generated and saved
- [ ] Issues (if any) logged
- [ ] Ready for submission

**Tester Signature**: ********\_********
**Date**: ********\_********

---

## Quick Commands Reference

```bash
# Open Cypress Test Runner
npm run cy:open

# Run all tests (headless)
npm test

# Run positive tests only
npm run cy:run:positive

# Run negative tests only
npm run cy:run:negative

# Run in Chrome
npm run test:chrome

# Run in headed mode (see browser)
npm run test:headed

# Generate Excel test cases
npm run generate-excel
```

## File Locations

- **Test Files**: `cypress/e2e/`
- **Page Objects**: `cypress/pages/`
- **Test Data**: `cypress/fixtures/users.json`
- **Credentials**: `cypress.env.json`
- **Reports**: `cypress/reports/`
- **Videos**: `cypress/videos/`
- **Screenshots**: `cypress/screenshots/`
- **Excel Documentation**: `WiseAdmit_SignIn_TestCases.xlsx`
