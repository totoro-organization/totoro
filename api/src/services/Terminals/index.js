const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const { Terminals, Status } = require("~orm/models");
const controller = require("~services/Commons/controller");
const { getRow, getPaginationQueries } = require("~utils/common/thenCatch");
const { label_status } = require("~utils/enum.json");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };
const include = [{ model: Status, as: "status", attributes: excludeCommon }];
const exclude = ["status_id"];

exports.router = (function () {
	const terminalsRouter = express.Router();
	const includeStatus = [{ model: Status }];

	terminalsRouter.get("/", async function (req, res) {
		const { status, page, size } = req.query;
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		let pagination = getPaginationQueries(size, page);

		controller.getAll(res, Terminals, condition, exclude, include, pagination);
	});

	terminalsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Terminals, id);
	});

	terminalsRouter.post("/", [
		passportAdmin,
		async function (req, res) {
			const data = req.body;
			const condition = { label: data.label };
			const { id: status_id } = await getRow(Status, {
				label: label_status.disabled,
			});
			data["status_id"] = status_id;

			controller.create(null, res, Terminals, data, condition);
		},
	]);

	terminalsRouter.put("/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			const condition = { name: data.name };
			controller.update(res, Terminals, id, data, condition);
		},
	]);

	terminalsRouter.delete("/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.delete(res, Terminals, { id });
		},
	]);

	return terminalsRouter;
})();
