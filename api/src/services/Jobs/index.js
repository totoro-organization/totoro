const express = require("express");
const { passport, passportAdmin } = require("utils/session");
const controller = require("./controller");
const { path } = require("utils/enum.json");
const { upload } = require("utils/storage");

exports.router = (function () {
	const jobsRouter = express.Router();

	jobsRouter.get("/", [
		passport,
		async function (req, res) {
			controller.getJobs(res, req.query);
		},
	]);

	jobsRouter.get("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getJob(res, id);
		},
	]);

	jobsRouter.post("/", [passport, controller.createJob]);

	jobsRouter.put("/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updateJob(res, id, data);
	});

	jobsRouter.delete("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteJob(res, id);
		},
	]);

	return jobsRouter;
})();
