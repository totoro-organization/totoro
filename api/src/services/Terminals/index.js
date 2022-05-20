const express = require("express");
const { passport } = require("utils/session");
const commonsController = require("services/Commons/controller");
const { Terminals, Status } = require("./../../../models");
const { getRow } = require("utils/common/thenCatch");

exports.router = (function () {
	const terminalsRouter = express.Router();
	const includeStatus = [{ model: Status }];

	terminalsRouter.get("/", async function (req, res) {
		commonsController.getAll(res, Terminals, null, includeStatus);
	});

	terminalsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		commonsController.getOne(res, Terminals, id, includeStatus);
	});

	terminalsRouter.post("/", async function (req, res) {
		const data = req.body;
		const condition = { label: data.label };
		const { id: status_id } = await getRow(Status, { label: "disabled" });
		data["status_id"] = status_id;
		commonsController.create(null, res, Terminals, data, condition);
	});

	terminalsRouter.put("/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const condition = { label: data.label };
		commonsController.update(res, Terminals, id, data, condition);
	});

	terminalsRouter.delete("/:id", async function (req, res) {
		const id = req.params.id;
		commonsController.delete(res, Terminals, {id});
	});

	return terminalsRouter;
})();
