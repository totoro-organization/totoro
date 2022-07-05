const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.0:6868/api",
    setupNodeEvents(on, config) {},
  },
});
