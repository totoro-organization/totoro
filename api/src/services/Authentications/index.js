const express = require("express");
const { passport } = require("~utils/session");
const usersController = require("~services/Users/controller");
const adminsController = require("~services/Admins/controller");
const controller = require("./controller");

const { Users, Admins } = require("~orm/models");

exports.router = (function () {
	const authRouter = express.Router();

	authRouter.post("/login", async function (req, res) {
		const data = req.body;
		controller.login(res, Users, data, false);
	});

	authRouter.post("/login/admin", async function (req, res) {
		const data = req.body;
		controller.login(res, Admins, data, true);
	});

	authRouter.post("/signup", async function (req, res) {
		const data = req.body;
		controller.signup(res, Users, data);
	});

	authRouter.post("/forgot", async function (req, res) {
		const data = req.body;
		controller.forgot(res, Users, data);
	});

	authRouter.get("/connected", [
		passport,
		async function (req, res) {
			if (req.userData.isAdmin) adminsController.getAdmin(res, req.userData.id);
			else usersController.getUser(res, req.userData.id);
		},
	]);

	return authRouter;
})();
