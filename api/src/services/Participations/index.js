const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");

const { params } = require("~utils/verify");
const { putParticipation } = require("./interface");

exports.router = (function () {
	const participationsRouter = express.Router();

	participationsRouter
	.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getParticipation(res, id);
	})

	.put("/:id", [passport, async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const restrictions = params(res, data, putParticipation);
		if(restrictions) return restrictions;

		controller.updateParticipation(res, id, data);
	}]);
	
	return participationsRouter;
})();
