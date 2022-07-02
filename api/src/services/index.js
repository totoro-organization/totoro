const users = require("./Users").router;
const admins = require("./Admins").router;
const terminals = require("./Terminals").router;
const jobs = require("./Jobs").router;
const authentications = require("./Authentications").router;
const commons = require("./Commons").router;
const applications = require("./Applications").router;
const litigations = require("./Litigations").router;
const messagings = require("./Messagings").router;
const organizations = require("./Organizations").router;
const partners = require("./Partners").router;
const discounts = require("./Discounts").router;
const subscriptions = require("./Subscriptions").router;
const participations = require("./Participations").router;

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
	organizations,
	partners,
	discounts,
	subscriptions,
	participations
};
