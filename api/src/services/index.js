const users = require("./Users").router;
const admins = require("./Admins").router;
const terminals = require("./Terminals").router;
const jobs = require("./Jobs").router;
const authentications = require("./Authentications").router;
const commons = require("./Commons").router;
const applications = require("./Applications").router;
const litigations = require("./Litigations").router;
const messagings = require("./Messagings").router;

module.exports = {
	users,
	admins,
	terminals,
	jobs,
	authentications,
	commons,
	applications,
	litigations,
	messagings,
};
