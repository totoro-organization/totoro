const sequelize_fixtures = require("sequelize-fixtures");
const models = require("~orm/models");

function errorReporter(message) {
  console.error("OH NO! ERROR: " + message);
}

// export and load fixtures
module.exports = {
  loadFixtures: () => {
    // can use glob syntax to select multiple files
    sequelize_fixtures
      .loadFile(process.cwd()+"/src/fixtures/fakes/*.js", models, {
        logger: {
          debug: console.log,
          info: console.log,
          warn: console.log,
          error: errorReporter,
        },
      })
      .then(function () {
        console.log("DEPLOIEMENT EFFECTUE AVEC SUCCES");
      });
  },
};
