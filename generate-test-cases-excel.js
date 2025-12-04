const ExcelJS = require("exceljs");
const path = require("path");

async function generateTestCaseExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sign-In Test Cases");

  // Define columns
  worksheet.columns = [
    { header: "Test ID", key: "testId", width: 12 },
    { header: "Test Scenario", key: "scenario", width: 35 },
    { header: "Test Type", key: "type", width: 12 },
    { header: "Description", key: "description", width: 50 },
    { header: "Pre-conditions", key: "preconditions", width: 40 },
    { header: "Test Steps", key: "steps", width: 50 },
    { header: "Test Data", key: "testData", width: 40 },
    { header: "Expected Result", key: "expected", width: 50 },
    { header: "Status", key: "status", width: 10 },
    { header: "Priority", key: "priority", width: 10 },
    { header: "Automated", key: "automated", width: 12 },
  ];

  // Style header row
  worksheet.getRow(1).font = { bold: true, size: 12 };
  worksheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4472C4" },
  };
  worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };

  // Test cases data
  const testCases = [
    {
      testId: "TC-001",
      scenario: "Valid credentials from fixture",
      type: "Positive",
      description:
        "Verify user can sign in with valid credentials using two-step flow",
      preconditions:
        "1. User has valid WiseAdmit account\n2. User is on sign-in page",
      steps:
        "1. Navigate to sign-in page\n2. Enter valid email\n3. Click Sign In (step 1)\n4. Wait for password field\n5. Enter valid password\n6. Click Sign In (step 2)",
      testData: "Email: prajalvaidya200011@gmail.com\nPassword: From fixture",
      expected:
        "1. User redirected to /dashboard\n2. Welcome message displays\n3. User profile visible\n4. User name: Prajal Vaidya",
      status: "Pass",
      priority: "High",
      automated: "Yes",
    },
    {
      testId: "TC-002",
      scenario: "Valid credentials from environment",
      type: "Positive",
      description:
        "Verify user can sign in with credentials from environment variables",
      preconditions:
        "1. Valid account\n2. Credentials in cypress.env.json\n3. On sign-in page",
      steps:
        "1. Navigate to sign-in page\n2. Enter email from env\n3. Click Sign In\n4. Enter password from env\n5. Click Sign In",
      testData: "Email: From env\nPassword: From env",
      expected:
        "1. Successfully logged in\n2. Redirected to dashboard\n3. User profile visible",
      status: "Pass",
      priority: "High",
      automated: "Yes",
    },
    {
      testId: "TC-003",
      scenario: "Page elements visibility",
      type: "Positive",
      description: "Verify all sign-in page elements are displayed correctly",
      preconditions: "1. User is on sign-in page",
      steps:
        "1. Navigate to sign-in page\n2. Wait for page load\n3. Verify email input visible\n4. Verify 'Login with phone' button\n5. Verify 'Create Account' link\n6. Verify welcome message",
      testData: "N/A",
      expected:
        "1. All elements visible\n2. Welcome message: 'Welcome back, future grads!'\n3. Login with phone option available",
      status: "Pass",
      priority: "Medium",
      automated: "Yes",
    },
    {
      testId: "TC-004",
      scenario: "Dashboard navigation after login",
      type: "Positive",
      description: "Verify dashboard navigation after successful login",
      preconditions: "1. Valid credentials\n2. User is on sign-in page",
      steps:
        "1. Sign in with valid credentials\n2. Wait for redirect\n3. Verify URL contains /dashboard\n4. Verify navigation links\n5. Verify application summary",
      testData: "Valid email and password",
      expected:
        "1. URL: /dashboard\n2. All nav links visible (Dashboard, Profile, Documents, Applications, Universities, WiseScore)\n3. Application summary displays",
      status: "Pass",
      priority: "High",
      automated: "Yes",
    },
    {
      testId: "TC-005",
      scenario: "User information display",
      type: "Positive",
      description: "Verify user information displays after login",
      preconditions: "1. Valid credentials\n2. User is on sign-in page",
      steps:
        "1. Sign in\n2. Verify dashboard loads\n3. Verify user name\n4. Verify welcome message\n5. Verify WiseScore section",
      testData: "Valid credentials",
      expected:
        "1. User name: 'Prajal Vaidya'\n2. Welcome message visible\n3. WiseScore: 0%\n4. User avatar visible",
      status: "Pass",
      priority: "Medium",
      automated: "Yes",
    },
    {
      testId: "TC-006",
      scenario: "Empty password field",
      type: "Negative",
      description: "Verify error when password field is empty",
      preconditions: "1. User is on sign-in page",
      steps:
        "1. Enter valid email\n2. Click Sign In\n3. Clear password field\n4. Verify password error\n5. Verify stay on page",
      testData: "Email: prajalvaidya200011@gmail.com\nPassword: Empty",
      expected:
        "1. Password validation error\n2. User stays on sign-in page\n3. Login prevented",
      status: "Pass",
      priority: "High",
      automated: "Yes",
    },
    {
      testId: "TC-007",
      scenario: "Both fields empty",
      type: "Negative",
      description: "Verify error when both fields are cleared",
      preconditions: "1. User is on sign-in page",
      steps:
        "1. Enter email\n2. Click Sign In\n3. Clear password\n4. Clear email\n5. Verify both errors",
      testData: "Email: Empty\nPassword: Empty",
      expected:
        "1. Email validation error\n2. Password validation error\n3. User stays on page",
      status: "Pass",
      priority: "High",
      automated: "Yes",
    },
    {
      testId: "TC-008",
      scenario: "Invalid email format",
      type: "Negative",
      description: "Verify error for invalid email format",
      preconditions: "1. User is on sign-in page",
      steps: "1. Enter invalid email\n2. Click Sign In\n3. Verify email error",
      testData: "Email: invalid-email-format",
      expected:
        "1. Email error: 'Invalid Email'\n2. User stays on page\n3. Login prevented",
      status: "Pass",
      priority: "High",
      automated: "Yes",
    },
    {
      testId: "TC-009",
      scenario: "Wrong password",
      type: "Negative",
      description: "Verify error with correct email but wrong password",
      preconditions: "1. Valid account\n2. On sign-in page",
      steps:
        "1. Enter valid email\n2. Click Sign In\n3. Enter wrong password\n4. Click Sign In\n5. Verify error",
      testData:
        "Email: prajalvaidya200011@gmail.com\nPassword: WrongPassword123",
      expected:
        "1. Error: 'Invalid Credentials'\n2. User stays on page\n3. Login denied",
      status: "Pass",
      priority: "High",
      automated: "Yes",
    },
    {
      testId: "TC-010",
      scenario: "Non-existent user",
      type: "Negative",
      description: "Verify error for non-existent account",
      preconditions: "1. User is on sign-in page",
      steps: "1. Enter non-existent email\n2. Click Sign In\n3. Verify error",
      testData: "Email: nonexistent@example.com",
      expected:
        "1. Error: 'Failed to get student'\n2. User stays on page\n3. Login denied",
      status: "Pass",
      priority: "High",
      automated: "Yes",
    },
    {
      testId: "TC-011",
      scenario: "SQL injection prevention",
      type: "Negative",
      description: "Verify SQL injection is prevented",
      preconditions: "1. User is on sign-in page",
      steps:
        "1. Enter SQL injection in email\n2. Click Sign In\n3. Verify prevented",
      testData: "Email: ' OR '1'='1\nOther: admin'--, 1' OR '1' = '1",
      expected:
        "1. Injection prevented\n2. Not logged in\n3. No DB errors\n4. Handled gracefully",
      status: "Pass",
      priority: "Critical",
      automated: "Yes",
    },
    {
      testId: "TC-012",
      scenario: "Special characters in email",
      type: "Negative",
      description: "Verify special characters handling",
      preconditions: "1. User is on sign-in page",
      steps:
        "1. Enter email with special chars\n2. Click Sign In\n3. Verify email error",
      testData: "Email: test+special@example.com",
      expected: "1. Email validation error\n2. User stays on page\n3. No crash",
      status: "Pass",
      priority: "Medium",
      automated: "Yes",
    },
  ];

  // Add test cases to worksheet
  testCases.forEach((testCase, index) => {
    const row = worksheet.addRow(testCase);
    row.alignment = { vertical: "top", wrapText: true };

    // Color code by type
    if (testCase.type === "Positive") {
      row.getCell("type").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFC6EFCE" },
      };
    } else {
      row.getCell("type").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFC7CE" },
      };
    }

    // Color code by priority
    const priorityCell = row.getCell("priority");
    if (testCase.priority === "Critical") {
      priorityCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF0000" },
      };
      priorityCell.font = { color: { argb: "FFFFFFFF" }, bold: true };
    } else if (testCase.priority === "High") {
      priorityCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFC000" },
      };
    } else if (testCase.priority === "Medium") {
      priorityCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
      };
    }

    // Color code status
    const statusCell = row.getCell("status");
    if (testCase.status === "Pass") {
      statusCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF00B050" },
      };
      statusCell.font = { color: { argb: "FFFFFFFF" }, bold: true };
    }
  });

  // Add summary sheet
  const summarySheet = workbook.addWorksheet("Summary");
  summarySheet.columns = [
    { header: "Metric", key: "metric", width: 30 },
    { header: "Value", key: "value", width: 20 },
  ];

  summarySheet.getRow(1).font = { bold: true, size: 12 };
  summarySheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4472C4" },
  };
  summarySheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };

  const positiveTests = testCases.filter((tc) => tc.type === "Positive").length;
  const negativeTests = testCases.filter((tc) => tc.type === "Negative").length;
  const criticalTests = testCases.filter(
    (tc) => tc.priority === "Critical"
  ).length;
  const highTests = testCases.filter((tc) => tc.priority === "High").length;
  const mediumTests = testCases.filter((tc) => tc.priority === "Medium").length;

  summarySheet.addRow({ metric: "Total Test Cases", value: testCases.length });
  summarySheet.addRow({ metric: "Positive Test Cases", value: positiveTests });
  summarySheet.addRow({ metric: "Negative Test Cases", value: negativeTests });
  summarySheet.addRow({ metric: "Critical Priority", value: criticalTests });
  summarySheet.addRow({ metric: "High Priority", value: highTests });
  summarySheet.addRow({ metric: "Medium Priority", value: mediumTests });
  summarySheet.addRow({ metric: "Automated", value: testCases.length });
  summarySheet.addRow({ metric: "Framework", value: "Cypress" });
  summarySheet.addRow({
    metric: "Design Pattern",
    value: "Page Object Model (POM)",
  });
  summarySheet.addRow({ metric: "Application", value: "WiseAdmit ApplyNow" });
  summarySheet.addRow({ metric: "Last Updated", value: "December 5, 2025" });

  // Save workbook
  const filePath = path.join(__dirname, "WiseAdmit_SignIn_TestCases.xlsx");
  await workbook.xlsx.writeFile(filePath);
  console.log(`✅ Test cases Excel file generated: ${filePath}`);
  console.log(`📊 Total test cases: ${testCases.length}`);
  console.log(`   - Positive: ${positiveTests}`);
  console.log(`   - Negative: ${negativeTests}`);
}

// Run the function
generateTestCaseExcel().catch(console.error);
