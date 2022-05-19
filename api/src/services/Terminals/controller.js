const models = require("../../models");
const asyncLib = require("async");
const { Op } = require("sequelize");

module.exports = {
  // Terminals
  getTerminals: function (res) {},
  getTerminal: function (res, id) {},
  createTerminal: function (res, data) {},
  updateTerminal: function (res, id, data) {},
  deleteTerminal: function (res, id) {},
  // Localisation
  getLocalisation: function (res) {},
  updateLocalisation: function (res, data) {},
};
