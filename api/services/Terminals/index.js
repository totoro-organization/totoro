const express = require("express");
const { passport } = require("../../utils/session");
const commonsController = require("../Commons/controller");
const { Terminals, Status } = require("../../models");
const { getRow } = require("../../utils/common/thenCatch");

exports.router = (function () {
	const terminalsRouter = express.Router();

	// terminalsRouter.post("/", async function (req, res) {
	// 	commonsController.getLocalisation(res);
	// });

	// terminalsRouter.put("/", async function (req, res) {
	// 	const data = req.body;
	// 	commonsController.sendWarning(res, data);
	// });

	terminalsRouter.get("/", async function (req, res) {
		commonsController.getAll(res, Terminals);
	});

	terminalsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		commonsController.getOne(res, Terminals, id);
	});

	terminalsRouter.post("/", async function (req, res) {
		const data = req.body;
		const condition = { label: data.label };
		const { id: status_id } = await getRow(Status, { label: "disabled" });
		data["status_id"] = status_id;
		commonsController.create(res, Terminals, data, condition);
	});

	terminalsRouter.put("/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const condition = { label: data.label };
		commonsController.update(res, Terminals, id, data, condition);
	});

	terminalsRouter.delete("/:id", async function (req, res) {
		const id = req.params.id;
		commonsController.delete(res, Terminals, id);
	});

	return terminalsRouter;
})();
