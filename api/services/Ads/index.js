const express = require("express");
const { passport } = require("../../utils/session");
const controller = require("./controller");

exports.router = (function () {
	const adsRouter = express.Router();

	adsRouter.get("/", async function (req, res) {
		controller.getAds(res);
	});

	adsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getAd(res, id);
	});

	adsRouter.post("/", async function (req, res) {
		const data = req.body;
		controller.createAd(res, data);
	});

	adsRouter.put("/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updateAd(res, id, data);
	});

	adsRouter.delete("/:id", async function (req, res) {
		const id = req.params.id;
		controller.deleteAd(res, id);
	});

	return adsRouter;
})();
