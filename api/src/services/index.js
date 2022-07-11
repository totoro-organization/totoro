const users = require("~services/Users").router;
const admins = require("~services/Admins").router;
const terminals = require("~services/Terminals").router;
const jobs = require("~services/Jobs").router;
const authentications = require("~services/Authentications").router;
const commons = require("~services/Commons").router;
const applications = require("~services/Applications").router;
const litigations = require("~services/Litigations").router;
const messagings = require("~services/Messagings").router;
const organizations = require("~services/Organizations").router;
const partners = require("~services/Partners").router;
const discounts = require("~services/Discounts").router;
const subscriptions = require("~services/Subscriptions").router;
const participations = require("~services/Participations").router;
const transactions = require("~services/Transactions").router;

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
	participations,
	transactions
};
