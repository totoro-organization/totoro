const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");
const { path } = require("~utils/enum.json");
const { upload } = require("~utils/storage");

exports.router = (function () {
	const jobsRouter = express.Router();

	jobsRouter.get("/", async function (req, res) {
		controller.getJobs(res, req.query);
	});

	jobsRouter.post("/", [passport, controller.createJob]);

	jobsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getJob(res, id, req.query);
	});

	jobsRouter.put("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			controller.updateJob(res, id, data);
		},
	]);

	jobsRouter.delete("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteJob(res, id);
		},
	]);

	jobsRouter.post("/:id/register", [
		passport,
		async function (req, res) {
			const data = {
				jobs_id: req.params.id,
				user_id: req.userData.id,
			};
			controller.registerToJob(res, data);
		},
	]);

	jobsRouter.get("/:id/participants", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getParticipants(res, id, req.query);
		},
	]);

	jobsRouter.get("/:id/favorites", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getFavorites(res, id, req.query);
		},
	]);

	jobsRouter.get("/:id/litigations", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getJobLitigations(res, id, req.query);
		},
	]);

	jobsRouter.put("/image/:attachment_jobs_id", [
		passport,
		upload(path.jobs).single("image"),
		async function (req, res) {
			const id = req.params.id;
			const data = {};
			if (req.file) {
				data.file = req.file;
				data.path = path.jobs;
				data.file_type = true;
			}

			controller.updateImage(res, id, data);
		},
	]);

	jobsRouter.delete("/image/:attachment_jobs_id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteImageJob(res, id);
		},
	]);

	return jobsRouter;
})();
