const express = require("express");
const { passport, passportAdmin } = require("utils/session");
const controller = require("./controller");
const { path } = require("utils/enum.json");
const { upload } = require("utils/storage");
const {
	getRow
  } = require("utils/common/thenCatch");

exports.router = (function () {
	const jobsRouter = express.Router();

	jobsRouter.get("/", async function (req, res) {
		controller.getJobs(res, req.query);
	});

	jobsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getJob(res, id);
	},);

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
			controller.getFavorites(res, id);
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

	jobsRouter.put("/image/:id", [passport, upload(path.jobs).single("image"), async function (req, res) {
		const id = req.params.id;
		const data = {};
		if (req.file) {
			data.file = req.file;
			data.path = path.jobs;
			data.file_type = true;
		}

		controller.updateImage(res, id, data);
	}]);

	jobsRouter.delete("/image/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteImageJob(res, id);
		},
	]);

	return jobsRouter;
})();
