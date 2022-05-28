const express = require("express");
const { passport, passportAdmin } = require("utils/session");
const controller = require("./controller");

exports.router = (function () {
	const adsRouter = express.Router();

	adsRouter.get("/", [
		passport,
		async function (req, res) {
			controller.getAds(res, req.query);
		},
	]);

	adsRouter.get("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getAd(res, id);
		},
	]);

	adsRouter.post("/", async function (req, res) {
		const data = req.body;
		controller.createAd(res, data);
	});

	adsRouter.put("/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updateAd(res, id, data);
	});

	adsRouter.delete("/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteAd(res, id);
		},
	]);

	return adsRouter;
})();
