const express = require("express");
const { passport } = require("utils/session");
const controller = require("./controller");

exports.router = (function () {
	const adminRouter = express.Router();

	adminRouter.get("/", async function (req, res) {
		controller.getAdmins(res);
	});

	adminRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getAdmin(res, id);
	});

	adminRouter.post("/", async function (req, res) {
		const data = req.body;
		controller.createAdmin(res, data);
	});

	adminRouter.put("/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updateAdmin(res, id, data);
	});

	adminRouter.delete("/:id", async function (req, res) {
		const id = req.params.id;
		controller.deleteAdmin(res, id);
	});

	adminRouter.get("/logs", async function (req, res) {
		controller.getLogs(res);
	});

	adminRouter.get("/logs/:adminId", async function (req, res) {
		const adminId = req.params.adminId;
		controller.getLog(res, adminId);
	});

	adminRouter.post("/logs", async function (req, res) {
		const data = req.body;
		controller.createLog(res, data);
	});

	adminRouter.post("/logs/truncate", async function (req, res) {
		const period = req.body;
		controller.getAdmins(res, period);
	});

	return adminRouter;
})();
