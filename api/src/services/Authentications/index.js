const express = require("express");
const { passport } = require("utils/session");
const commonsController = require("../Commons/controller");
const usersController = require("../Users/controller");
const adminsController = require("../Admins/controller");
const controller = require("./controller");

const { Users, Admins } = require("../../../models");

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

	authRouter.get("/connected",[passport, async function (req, res) {
		if(req.userData.isAdmin)
			adminsController.getAdmin(res, req.userData.id);
		else
			usersController.getUser(res, req.userData.id);
	}]);

	return authRouter;
})();
