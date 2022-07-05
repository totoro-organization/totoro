const admins = require("./admins");
const applications = require("./applications");
const auth = require("./auth");
const commons = require("./commons");
const discounts = require("./discounts");
const favorites = require("./favorites");
const jobs = require("./jobs");
const litigations = require("./litigations");
const organizations = require("./organizations");
const partners = require("./partners");
const users = require("./users");
const subscriptions = require("./subscriptions");
const participations = require("./participations");

module.exports = {
	...admins,
	...applications,
	...auth,
	...commons,
	...discounts,
	...favorites,
	...jobs,
	...litigations,
	...organizations,
	...partners,
	...users,
	...subscriptions,
	...participations,
};
