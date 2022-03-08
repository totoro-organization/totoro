const express = require("express");
const controller = require("../Commons/controller");
const { Applications } = require("../../models");

exports.router = (function () {
	const applicationsRouter = express.Router();

	applicationsRouter.get("/", async function (req, res) {
		controller.getAll(res, Applications);
	});

	applicationsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Applications, id);
	});

	applicationsRouter.post("/", async function (req, res) {
		const data = req.body;
		const condition = { name: data.name };
		controller.create(res, Applications, data, condition);
	});

	applicationsRouter.put("/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const condition = { name: data.name };
		controller.update(res, Applications, id, data, condition);
	});

	applicationsRouter.delete("/:id", async function (req, res) {
		const id = req.params.id;
		controller.delete(res, Applications, id);
	});

	return applicationsRouter;
})();
