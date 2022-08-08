const express = require("express");
const { passportAdmin } = require("~utils/session");
const { params } = require("~utils/verify");
const controller = require("./controller");
const {postAdmin, postLogAdmin, putAdmin, putPasswordAdmin, putRoleAdmin} = require("./interface");

exports.router = (function () {
  const adminRouter = express.Router();

  adminRouter
  .get("/", [
    passportAdmin,
    async function (req, res) {
      controller.getAdmins(res, req.query);
    },
  ])

  .get("/:id", [
    passportAdmin,
    async function (req, res) {
      const id = req.params.id;
      controller.getAdmin(res, id);
    },
  ])

  .post("/", [
    passportAdmin,
    async function (req, res) {
      const data = req.body;
      const restrictions = params(res, data, postAdmin);
      if(restrictions) return restrictions;
      
      controller.createAdmin(res, data);
    },
  ])

  .put("/:id",[passportAdmin, async function (req, res) {
		const id = req.params.id;
    const data = req.body;
    const restrictions = params(res, data, putAdmin);
    if(restrictions) return restrictions;

		controller.updateAdmin(res, id, data);
	}])

	.put("/:id/role",[passportAdmin, async function (req, res) {
		const data = req.body;
		data.admin_id = req.params.id;   
    const restrictions = params(res, data, putRoleAdmin);
    if(restrictions) return restrictions;
    
		controller.changeRole(res, data);
	}])

	.delete("/:id", [passportAdmin, async function (req, res) {
		const id = req.params.id;
		controller.deleteAdmin(res, id);
	}])

	.get("/:id/logs", [passportAdmin, async function (req, res) {
		const adminId = req.params.id;
		controller.getLog(res, adminId, req.query);
	}])

	.post("/:id/logs", [passportAdmin, async function (req, res) {
		const data = req.body;
    const restrictions = params(res, data, postLogAdmin);
    if(restrictions) return restrictions;
    
		data.admin_id = req.params.id;
		controller.createLog(res, data);
	}])

  .put("/:id/reset-password", [passportAdmin, async function (req, res) {
		controller.resetPassword(res, req.params.id);
	}])

	.put("/change/password",[passportAdmin, async function (req, res) {
		const data = req.body;
    const restrictions = params(res, data, putPasswordAdmin);
    if(restrictions) return restrictions;

		data.id = req.userData.id;
		controller.changePassword(res, data);
	}])

  .get("/logs/getAll", [
    passportAdmin,
    async function (req, res) {
      controller.getLogs(res, req.query);
    },
  ])

  .delete("/logs/truncate", [
    passportAdmin,
    async function (req, res) {
      controller.truncateLogs(res, req.query);
    },
  ]);

  return adminRouter;
})();
