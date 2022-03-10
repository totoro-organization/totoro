const express = require("express");
const commonsController = require("../Commons/controller");
const controller = require("./controller");

const { Users } = require("../../models");

exports.router = (function () {
	const authRouter = express.Router();

	authRouter.post("/login", async function (req, res) {
		const data = req.body;
		controller.login(res, Users, data);
	});

	authRouter.post("/signup", async function (req, res) {
		const data = req.body;
		const newData = await controller.signup(data);
		const condition = { email: data.email, username: data.username };
		commonsController.create(res, Users, newData, condition);
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
