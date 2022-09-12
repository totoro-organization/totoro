const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");

const { params } = require("~utils/verify");
const { postSubscription, putSubscription } = require("./interface");

exports.router = (function () {
	const subscriptionsRouter = express.Router();

	subscriptionsRouter
	.get("/", [passport, async function (req, res) {
		controller.getSubscriptions(res, req.query);
	}])

	.post("/", [
		passport,
		async function (req, res) {
			const data = req.body;
			const restrictions = params(res, data, postSubscription);
			if(restrictions) return restrictions;

			controller.createSubscription(res, data);
		},
	])

	.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getSubscription(res, id);
	})

	.put("/:id", [passport, async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const restrictions = params(res, data, putSubscription);
		if(restrictions) return restrictions;

		controller.updateSubscription(res, id, data);
	}]);

	
	return subscriptionsRouter;
})();
