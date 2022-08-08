const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");
const { path } = require("~utils/enum.json");
const { upload } = require("~utils/storage");

const { params } = require("~utils/verify");
const { putPartner, postPartner } = require("./interface");

exports.router = (function () {
	const partnersRouter = express.Router();

	partnersRouter
	.get("/", async function (req, res) {
		controller.getPartners(res, req.query);
	})

	.post("/", [
		passport,
		async function (req, res) {
			const data = req.body;
			const restrictions = params(res, data, postPartner);
			if(restrictions) return restrictions;

			data.user_id = req.userData.id;
			controller.createPartner(res, data);
		},
	])

	.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getPartner(res, id);
	})

	.put("/:id", [passport, async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const restrictions = params(res, data, putPartner);
		if(restrictions) return restrictions;

		controller.updatePartner(res, id, data);
	}])

	.delete("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.deletePartner(res, id);
		},
	])

	.get("/:id/discounts", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getPartnerDiscounts(res, id, req.query);
		},
	])

	.get("/:id/transactions", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getTransactions(res, id, req.query);
		},
	])

	.put("/:id/logo", [passport, upload(path.partners).single("logo"), async function (req, res) {
		const id = req.params.id;
		const data = {};
		if (req.file) {
			data.file = req.file;
			data.path = path.partners;
		}

		controller.updateLogo(res, id, data);
	}])

	.put("/:id/banner", [passport, upload(path.partners).single("banner"), async function (req, res) {
		const id = req.params.id;
		const data = {};
		if (req.file) {
			data.file = req.file;
			data.path = path.partners;
		}

		controller.updateLogo(res, id, data);
	}]);

	return partnersRouter;
})();
