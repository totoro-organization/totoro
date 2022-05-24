const express = require("express");
const { passport, passportAdmin } = require("utils/session");
const controller = require("./controller");

exports.router = (function () {
	const UsersRouter = express.Router();

	UsersRouter.get("/", [
		passport,
		async function (req, res) {
			controller.getUsers(res, req.query);
		},
	]);

	UsersRouter.put("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			controller.update(res, id, data);
		},
	]);

	UsersRouter.delete("/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteUser(res, id);
		},
	]);

	UsersRouter.get("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
		},
	]);

	// Favorites

	UsersRouter.get("/favorites", [
		passport,
		async function (req, res) {
			controller.getFavorites(res);
		},
	]);

	UsersRouter.delete("/favorites/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteFavorite(res, id);
		},
	]);

	UsersRouter.post("/favorites", [
		passport,
		async function (req, res) {
			const data = req.body;
			controller.createFavorite(res, data);
		},
	]);

	// Litigations

	UsersRouter.get("/litigations", [
		passport,
		async function (req, res) {
			controller.getUserLitigations(res);
		},
	]);

	// Ads

	UsersRouter.get("/ads", [
		passport,
		async function (req, res) {
			controller.getUserAds(res);
		},
	]);

	// Rating

	UsersRouter.get("/rating", [
		passport,
		async function (req, res) {
			controller.getUserRatings(res);
		},
	]);

	UsersRouter.post("/rating", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			controller.rate(res, id, data);
		},
	]);

	// Actions

	UsersRouter.put("/favorites", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			controller.getFavorites(res, id, data);
		},
	]);

	return UsersRouter;
})();
