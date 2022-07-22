const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api-totoro.herokuapp.com/api",
    setupNodeEvents(on, config) {},
  },
});
