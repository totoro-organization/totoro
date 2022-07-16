const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");

exports.router = (function () {
	const participationsRouter = express.Router();

	participationsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getParticipation(res, id);
	});

	participationsRouter.put("/:id", [passport, async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updateParticipation(res, id, data);
	}]);
	
	return participationsRouter;
})();
