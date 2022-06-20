const express = require("express");
const { passport, passportAdmin } = require("utils/session");
const controller = require("./controller");

exports.router = (function () {
	const discountsRouter = express.Router();

	discountsRouter.get("/", [passport, async function (req, res) {
		controller.getDiscounts(res, req.query);
	}]);

	discountsRouter.post("/", [
		passport,
		async function (req, res) {
			const data = req.body;
			controller.createDiscount(res, data);
		},
	]);

	discountsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getDiscount(res, id);
	});

	discountsRouter.put("/:id", [passport, async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updateDiscount(res, id, data);
	}]);

	discountsRouter.delete("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteDiscount(res, id);
		},
	]);

	return discountsRouter;
})();
