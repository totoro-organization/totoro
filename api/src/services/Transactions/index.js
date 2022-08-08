const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");

exports.router = (function () {
	const transactionsRouter = express.Router();

	transactionsRouter
	.get("/",[passport, async function (req, res) {
		controller.getTransactions(res, req.query);
	}])

	.post("/", [
		passport,
		async function (req, res) {
			const data = req.body;
			data.user_id = req.userData.id;
			controller.createTransaction(res, data);
		},
	])

	.get("/:id", [passport, async function (req, res) {
		const id = req.params.id;
		controller.getTransaction(res, id);
	}])

	.get("/verify/:code", [passport, async function (req, res) {
		const code = req.params.code;
		controller.getTransactionByCode(res, code);
	}])

	.put("/:id", [passport, async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updateTransaction(res, id, data);
	}]);

	return transactionsRouter;
})();
