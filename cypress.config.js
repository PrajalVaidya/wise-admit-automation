const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.wiseadmit.io/",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      // Environment variables can be set here
    },
    retries: {
      runMode: 2,
      openMode: 0,
    },
    watchForFileChanges: false,
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
  },
});
