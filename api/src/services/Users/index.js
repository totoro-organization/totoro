const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");
const { path } = require("~utils/enum.json");
const { upload } = require("~utils/storage");
const { getUser } = require("~utils/session");
const { error } = require("~utils/common/messages.json");
const {
	Status
} = require("~orm/models");
const {
	getRow
} = require("~utils/common/thenCatch");
const { label_status } = require("~utils/enum.json");

const { params } = require("~utils/verify");
const { postFavotitesUser, putUser, activateUser, resetPassword, putPassword } = require("./interface");


exports.router = (function () {
	const UsersRouter = express.Router();

	UsersRouter
	.get("/", [
		passport,
		async function (req, res) {
			controller.getUsers(res, req.query);
		},
	])

	.get("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getUser(res, id);
		},
	])

	.put("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			const restrictions = params(res, data, putUser);
			if(restrictions) return restrictions;

			controller.updateUser(res, id, data);
		},
	])

	.delete("/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteUser(res, id);
		},
	])

	.put("/change/password", [
		passport,
		async function (req, res) {
			const data = req.body;
			const restrictions = params(res, data, putPassword);
			if(restrictions) return restrictions;

			data.id = req.userData.id;
			controller.changePassword(res, data);
		},
	])

	.put("/reset/password",
		async function (req, res) {
			const data = req.body;
			const restrictions = params(res, data, resetPassword);
			if(restrictions) return restrictions;

			const token = getUser(data.token);
			if(token){
				delete data.token;
				controller.resetPassword(res, token['id'], data);
			} else {
				return res
					.status(error.access_denied.status)
					.json({ message: error.access_denied.message });
			}
		}
	)

	.put("/change/avatar", [passport, upload(path.avatar).single("avatar"), async function (req, res) {
		const id = req.userData.id;
		const data = {};
		if (req.file) {
			data.file = req.file;
			data.path = path.avatar;
		}

		controller.updateAvatar(res, id, data);
	}])

	.get("/:id/favorites", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getFavorites(res, id, req.query);
		},
	])

	.post("/:id/favorites", [
		passport,
		async function (req, res) {
			const data = req.body;
			const restrictions = params(res, data, postFavotitesUser);
			if(restrictions) return restrictions;

			data.user_id = req.params.id;
			controller.createFavorite(res, data);
		},
	])

	// Jobs
	.get("/:id/jobs", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getUserJobs(res, id, req.query);
		},
	])

	.get("/members/:memberId/jobs", [
		passport,
		async function (req, res) {
			const id = req.params.memberId;
			controller.getUserJobsPublished(res, id, req.query);
		},
	])

	// Litigations
	.get("/:id/litigations", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getUserLitigations(res, id, req.query);
		},
	])

	.get("/:id/transactions", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getTransactions(res, id, req.query);
		},
	])

	.put("/account/activate",
		async function (req, res) {
			const data = req.body;
			const restrictions = params(res, data, activateUser);
			if(restrictions) return restrictions;

			const token = getUser(data.token);
			if(token){
				delete data.token;
				const id = token['id'];
				const statusData = await getRow(res, Status, { label: label_status.actived });
    			data.status_id = statusData.id
				controller.updateUser(res, id, data);
			} else {
				return res
					.status(error.access_denied.status)
					.json({ message: error.access_denied.message });
			}
		},
	);

	return UsersRouter;
})();
