const express = require("express");
const { passport } = require("utils/session");
const commonsController = require("../Commons/controller");
const controller = require("./controller");

const { Users } = require("../../../models");

exports.router = (function () {
	const authRouter = express.Router();

	authRouter.post("/login", async function (req, res) {
		const data = req.body;
		controller.login(res, Users, data);
	});

	authRouter.post("/signup", async function (req, res) {
		const data = req.body;
		controller.signup(res, Users, data);
	});

	authRouter.post("/forgot", async function (req, res) {
		const data = req.body;
		controller.forgot(res, data);
	});

	authRouter.put("/reset-password", async function (req, res) {
		const data = req.body;
		controller.resetPassword(res, data);
	});

	return authRouter;
})();
