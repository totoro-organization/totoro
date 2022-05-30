const express = require("express");
const { passport, passportAdmin } = require("utils/session");
const controller = require("./controller");

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

	jobsRouter.post("/", async function (req, res) {
		const data = req.body;
		controller.createJob(res, data);
	});

	jobsRouter.put("/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updateJob(res, id, data);
	});

	jobsRouter.delete("/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteJob(res, id);
		},
	]);

	return jobsRouter;
})();
