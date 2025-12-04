/**
/**
 * Page Object Model for Dashboard/Home Page
 * Contains locators and methods for the page after successful login
 */

class DashboardPage {
  // Page URL
  url = "/dashboard";

  // Locators - Based on actual WiseAdmit dashboard
  selectors = {
    // Navigation links
    dashboardLink: 'a[href="/dashboard"]',
    profileLink: 'a[href="/dashboard/profile"]',
    documentsLink: 'a[href="/dashboard/documents"]',
    applicationsLink: 'a[href="/dashboard/applications"]',
    universitiesLink: 'a[href="/dashboard/universitiesandprograms"]',
    wiseScoreLink: 'a[href="/dashboard/wisescore"]',

    // User profile section
    userAvatar: 'img[alt="User Avatar"]',
    userName:
      'span.MuiTypography-body3:contains("Prajal Vaidya"), .MuiTypography-body3',
    userProfileSection: '.MuiStack-root:has(img[alt="User Avatar"])',

    // Welcome section
    welcomeText: 'span:contains("Welcome to WiseAdmit!")',
    applicationStepsTitle: 'h5:contains("Your application steps")',

    // WiseScore section
    wiseScorePercentage: 'span.MuiTypography-body3:contains("%")',
    wiseScoreButton: 'a[href="/dashboard/wisescore"]',

    // Application summary
    applicationSummaryTitle: 'span:contains("Application summary")',
    startedCount: 'span.MuiTypography-h7:contains("Started")',
    paidCount: 'span.MuiTypography-h7:contains("Paid")',

    // Journey steps
    preApplicationSection: 'div:contains("Pre-Application")',
    postApplicationSection: 'div:contains("Post-Application")',
    preDepartureSection: 'div:contains("Pre-Departure")',

    // Page title
    pageTitle: 'h5:contains("Your application steps"), h4, h5',
  };

  /**
   * Verify user is on dashboard
   */
  verifyDashboardLoaded() {
    // Check URL contains dashboard
    cy.url({ timeout: 10000 }).should("include", "/dashboard");
    return this;
  }

  /**
   * Wait for dashboard to fully load
   */
  waitForDashboardLoad() {
    cy.get(this.selectors.welcomeText, { timeout: 10000 }).should("be.visible");
    cy.get(this.selectors.userAvatar, { timeout: 10000 }).should("be.visible");
    return this;
  }

  /**
   * Verify user profile is visible
   */
  verifyUserProfileVisible() {
    cy.get(this.selectors.userAvatar, { timeout: 10000 }).should("be.visible");
    return this;
  }

  /**
   * Verify user name is displayed
   * @param {string} userName - Expected user name
   */
  verifyUserName(userName) {
    if (userName) {
      cy.contains(userName).should("be.visible");
    } else {
      cy.get(this.selectors.userName).should("be.visible");
    }
    return this;
  }

  /**
   * Verify welcome message
   */
  verifyWelcomeMessage() {
    cy.get(this.selectors.welcomeText).should("be.visible");
    return this;
  }

  /**
   * Verify navigation links are visible
   */
  verifyNavigationLinks() {
    cy.get(this.selectors.dashboardLink).should("be.visible");
    cy.get(this.selectors.profileLink).should("be.visible");
    cy.get(this.selectors.documentsLink).should("be.visible");
    cy.get(this.selectors.applicationsLink).should("be.visible");
    cy.get(this.selectors.universitiesLink).should("be.visible");
    cy.get(this.selectors.wiseScoreLink).should("be.visible");
    return this;
  }

  /**
   * Click on Dashboard link
   */
  clickDashboard() {
    cy.get(this.selectors.dashboardLink).click();
    return this;
  }

  /**
   * Click on Profile link
   */
  clickProfile() {
    cy.get(this.selectors.profileLink).click();
    return this;
  }

  /**
   * Click on Documents link
   */
  clickDocuments() {
    cy.get(this.selectors.documentsLink).click();
    return this;
  }

  /**
   * Click on Applications link
   */
  clickApplications() {
    cy.get(this.selectors.applicationsLink).click();
    return this;
  }

  /**
   * Click on Universities link
   */
  clickUniversities() {
    cy.get(this.selectors.universitiesLink).click();
    return this;
  }

  /**
   * Click on WiseScore link
   */
  clickWiseScore() {
    cy.get(this.selectors.wiseScoreLink).first().click();
    return this;
  }

  /**
   * Verify application summary is visible
   */
  verifyApplicationSummary() {
    cy.get(this.selectors.applicationSummaryTitle).should("be.visible");
    return this;
  }

  /**
   * Verify WiseScore section is visible
   */
  verifyWiseScoreSection() {
    cy.get(this.selectors.wiseScorePercentage).should("be.visible");
    return this;
  }

  /**
   * Verify dashboard title
   * @param {string} expectedTitle - Expected dashboard title
   */
  verifyDashboardTitle(expectedTitle) {
    if (expectedTitle) {
      cy.contains(expectedTitle).should("be.visible");
    } else {
      cy.get(this.selectors.applicationStepsTitle).should("be.visible");
    }
    return this;
  }
}

export default DashboardPage;
