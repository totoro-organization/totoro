const models = require("models");
const asyncLib = require("async");
const { Op } = require("sequelize");

module.exports = {
	getLitigations: function (res) {},
	getLitigation: function (res, id) {},
	createLitigation: function (res, data) {},
	updateLitigation: function (res, id, data) {},
	deleteLitigation: function (res, id) {},
	sendWarning: function (res, id, data) {},
};
