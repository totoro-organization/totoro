const express = require("express");
const { passportAdmin } = require("utils/session");
const controller = require("./controller");

exports.router = (function () {
  const adminRouter = express.Router();

  adminRouter.get("/", [
    passportAdmin,
    async function (req, res) {
      controller.getAdmins(res, req.query);
    },
  ]);

  adminRouter.get("/:id", [
    passportAdmin,
    async function (req, res) {
      const id = req.params.id;
      controller.getAdmin(res, id);
    },
  ]);

  adminRouter.post("/", [
    passportAdmin,
    async function (req, res) {
      const data = req.body;
      controller.createAdmin(res, data);
    },
  ]);

	adminRouter.put("/:id/role",[passportAdmin, async function (req, res) {
		const data = req.body;
		data.admin_id = req.params.id;
		controller.changeRole(res, data);
	}]);

	adminRouter.delete("/:id", [passportAdmin, async function (req, res) {
		const id = req.params.id;
		controller.deleteAdmin(res, id);
	}]);

	adminRouter.get("/:id/logs", [passportAdmin, async function (req, res) {
		const adminId = req.params.id;
		controller.getLog(res, adminId, req.query);
	}]);

	adminRouter.post("/:id/logs", [passportAdmin, async function (req, res) {
		const data = req.body;
		data.admin_id = req.params.id;
		controller.createLog(res, data);
	}]);

	adminRouter.put("/change/password",[passportAdmin, async function (req, res) {
		const data = req.body;
		data.id = req.userData.id;
		controller.resetPassword(res, data);
	}]);
	
	adminRouter.get("/logs/getAll",[passportAdmin, async function (req, res) {
		controller.getLogs(res, req.query);
	}]);

  adminRouter.get("/logs/getAll", [
    passportAdmin,
    async function (req, res) {
      controller.getLogs(res, req.query);
    },
  ]);

  adminRouter.delete("/logs/truncate", [
    passportAdmin,
    async function (req, res) {
      controller.truncateLogs(res, req.query);
    },
  ]);

  return adminRouter;
})();
