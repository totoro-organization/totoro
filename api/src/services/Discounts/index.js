const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");

const { params } = require("~utils/verify");
const { postDiscount, putDiscount } = require("./interface");


exports.router = (function () {
	const discountsRouter = express.Router();

	discountsRouter
	.get("/", [passport, async function (req, res) {
		controller.getDiscounts(res, req.query);
	}])

	.post("/", [
		passport,
		async function (req, res) {
			const data = req.body;
			const restrictions = params(res, data, postDiscount);
			if(restrictions) return restrictions;

			controller.createDiscount(res, data);
		},
	])

	.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getDiscount(res, id);
	})

	.put("/:id", [passport, async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const restrictions = params(res, data, putDiscount);
		if(restrictions) return restrictions;

		controller.updateDiscount(res, id, data);
	}])

	.delete("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteDiscount(res, id);
		},
	]);

	return discountsRouter;
})();
