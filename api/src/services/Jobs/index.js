const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");
const { path } = require("~utils/enum.json");
const { upload } = require("~utils/storage");

exports.router = (function () {
	const jobsRouter = express.Router();

	jobsRouter
	.get("/", async function (req, res) {
		controller.getJobs(res, req.query);
	})

	.post("/", [passport, controller.createJob])

	.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getJob(res, id, req.query);
	},)

	.put("/:id", [passport, async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updateJob(res, id, data);
	}])

	.delete("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteJob(res, id);
		},
	])

	.post("/:id/register", [passport, async function (req, res) {
		const data = {
			jobs_id: req.params.id,
			user_id: req.userData.id
		};
		controller.registerToJob(res, data);
	}])

	.get("/:id/participants", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getParticipants(res, id, req.query);
		},
	])

	.get("/:id/favorites", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getFavorites(res, id, req.query);
		},
	])

	.get("/:id/litigations", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getJobLitigations(res, id, req.query);
		},
	])

	.put("/image/:attachment_jobs_id", [passport, upload(path.jobs).single("image"), async function (req, res) {
		const id = req.params.id;
		const data = {};
		if (req.file) {
			data.file = req.file;
			data.path = path.jobs;
			data.file_type = true;
		}

		controller.updateImage(res, id, data);
	}])

	.delete("/image/:attachment_jobs_id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteImageJob(res, id);
		},
	]);

	return jobsRouter;
})();
