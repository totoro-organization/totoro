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

	UsersRouter.get("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getUser(res, id);
		},
	]);

	UsersRouter.put("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			controller.updateUser(res, id, data);
		},
	]);

	UsersRouter.delete("/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteUser(res, id);
		},
	]);

	UsersRouter.put("/change/password", [
		passport,
		async function (req, res) {
			const data = req.body;
			data.id = req.userData.id;
			controller.resetPassword(res, data);
		},
	]);

	UsersRouter.get("/:id/favorites", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getFavorites(res, id);
		},
	]);

	UsersRouter.post("/:id/favorites", [
		passport,
		async function (req, res) {
			const data = req.body;
			data.user_id = req.params.id;
			controller.createFavorite(res, data);
		},
	]);

	UsersRouter.delete("/favorites/:favotiteId", [
		passport,
		async function (req, res) {
			const id = req.params.favotiteId;
			controller.deleteFavorite(res, id);
		},
	]);

	// Jobs
	UsersRouter.get("/:id/jobs", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getUserJobs(res, id, req.query);
		},
	]);

	// Litigations
	UsersRouter.get("/:id/litigations", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getUserLitigations(res, id, req.query);
		},
	]);

	return UsersRouter;
})();
