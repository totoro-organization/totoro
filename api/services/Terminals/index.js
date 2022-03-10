const express = require("express");
const controller = require("../Commons/controller");
const { Terminals, Status } = require("../../models");
const { getRow } = require("../../utils/Commons/thenCatch");

exports.router = (function () {
	const terminalsRouter = express.Router();

	// terminalsRouter.post("/", async function (req, res) {
	// 	controller.getLocalisation(res);
	// });

	// terminalsRouter.put("/", async function (req, res) {
	// 	const data = req.body;
	// 	controller.sendWarning(res, data);
	// });

	terminalsRouter.get("/", async function (req, res) {
		controller.getAll(res, Terminals);
	});

	terminalsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Terminals, id);
	});

	terminalsRouter.post("/", async function (req, res) {
		const data = req.body;
		const condition = { label: data.label };
		const { id: status_id } = await getRow(Status, { label: "disabled" });
		data["status_id"] = status_id;
		controller.create(res, Terminals, data, condition);
	});

	terminalsRouter.put("/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const condition = { label: data.label };
		controller.update(res, Terminals, id, data, condition);
	});

	terminalsRouter.delete("/:id", async function (req, res) {
		const id = req.params.id;
		controller.delete(res, Terminals, id);
	});

	return terminalsRouter;
})();
