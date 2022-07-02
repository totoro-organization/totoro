const express = require("express");
const { passport, passportAdmin } = require("utils/session");
const controller = require("./controller");
const { path } = require("utils/enum.json");
const { upload } = require("utils/storage");

exports.router = (function () {
	const partnersRouter = express.Router();

	partnersRouter.get("/", async function (req, res) {
		controller.getPartners(res, req.query);
	});

	partnersRouter.post("/", [
		passport,
		async function (req, res) {
			const data = req.body;
			data.user_id = req.userData.id;
			controller.createPartner(res, data);
		},
	]);

	partnersRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getPartner(res, id);
	});

	partnersRouter.put("/:id", [passport, async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updatePartner(res, id, data);
	}]);

	partnersRouter.delete("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.deletePartner(res, id);
		},
	]);

	partnersRouter.get("/:id/discounts", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getPartnerDiscounts(res, id, req.query);
		},
	]);

	partnersRouter.get("/:id/transactions", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getTransactions(res, id, req.query);
		},
	]);

	partnersRouter.put("/:id/logo", [passport, upload(path.partners).single("logo"), async function (req, res) {
		const id = req.params.id;
		const data = {};
		if (req.file) {
			data.file = req.file;
			data.path = path.logo;
		}

		controller.updateLogo(res, id, data);
	}]);

	return partnersRouter;
})();
