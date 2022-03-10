const express = require("express");
const controller = require("./controller");

exports.router = (function () {
	const subscriptionsRouter = express.Router();

	subscriptionsRouter.get("/", async function (req, res) {
		controller.getSubscriptions(res);
	});

	subscriptionsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getParameters(res, id);
	});

	subscriptionsRouter.get("/user/:id", async function (req, res) {
		const id = req.params.id;
		controller.getUserSubscription(res, id);
	});

	subscriptionsRouter.post("/", async function (req, res) {
		const data = req.body;
		controller.createSubscription(res, data);
	});

	subscriptionsRouter.put("/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updateSubscription(res, id, data);
	});

	subscriptionsRouter.delete("/:id", async function (req, res) {
		const id = req.params.id;
		controller.deleteSubscription(res, id);
	});

	return subscriptionsRouter;
})();
