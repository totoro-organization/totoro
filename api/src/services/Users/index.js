const express = require("express");
const { passport } = require("utils/session");
const commonsController = require("services/Commons/controller");
const controller = require("./controller");
const { Users, Status, Terminals } = require("./../../../models");

exports.router = (function () {
	const UsersRouter = express.Router();
	const includeStatusAndTerminal = [{ model: Status }, { model: Terminals }];

	UsersRouter.get("/", async function (req, res) {
		commonsController.getAll(res, Users, null, includeStatusAndTerminal);
	});

	UsersRouter.put("/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.update(res, id, data);
	});

	UsersRouter.delete("/:id", async function (req, res) {
		const id = req.params.id;
		commonsController.delete(res, id);
	});

	UsersRouter.get("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			commonsController.getOne(res, Users, id, includeStatusAndTerminal);
		},
	]);

	// Favorites

	UsersRouter.get("/favorites", async function (req, res) {
		controller.getFavorites(res);
	});

	UsersRouter.delete("/favorites/:id", async function (req, res) {
		const id = req.params.id;
		controller.deleteFavorite(res, id);
	});

	UsersRouter.post("/favorites", async function (req, res) {
		const data = req.body;
		controller.createFavorite(res, data);
	});

	// Litigations

	UsersRouter.get("/litigations", async function (req, res) {
		controller.getUserLitigations(res);
	});

	// Ads

	UsersRouter.get("/ads", async function (req, res) {
		controller.getUserAds(res);
	});

	// Rating

	UsersRouter.get("/rating", async function (req, res) {
		controller.getUserRatings(res);
	});

	UsersRouter.post("/rating", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.rate(res, id, data);
	});

	// Actions

	UsersRouter.put("/favorites", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.getFavorites(res, id, data);
	});

	return UsersRouter;
})();
