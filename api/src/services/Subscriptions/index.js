const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");

exports.router = (function () {
	const subscriptionsRouter = express.Router();

	subscriptionsRouter.get("/", [passport, async function (req, res) {
		controller.getSubscriptions(res, req.query);
	}]);

	subscriptionsRouter.post("/", [
		passport,
		async function (req, res) {
			const data = req.body;
			controller.createSubscription(res, data);
		},
	]);

	subscriptionsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getSubscription(res, id);
	});

	subscriptionsRouter.put("/:id", [passport, async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updateSubscription(res, id, data);
	}]);

	
	return subscriptionsRouter;
})();
