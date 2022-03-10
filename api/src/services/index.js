const users = require("./Users").router;
const admins = require("./Admins").router;
const terminals = require("./Terminals").router;
const ads = require("./Ads").router;
const authentications = require("./Authentications").router;
const commons = require("./Commons").router;
const applications = require("./Applications").router;
const litigations = require("./Litigations").router;
const messagings = require("./Messagings").router;
const parameters = require("./Parameters").router;
const transactions = require("./Transactions").router;
const subscriptions = require("./Subscriptions").router;

module.exports = {
	users,
	admins,
	terminals,
	ads,
	authentications,
	commons,
	applications,
	litigations,
	messagings,
	parameters,
	transactions,
	subscriptions,
};
