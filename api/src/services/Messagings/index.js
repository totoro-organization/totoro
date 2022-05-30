const express = require("express");
const controller = require("./controller");

exports.router = (function () {
	const MessagingsRouter = express.Router();

	MessagingsRouter.post("/", async function (req, res) {
		const data = req.body;
		controller.createMessage(res, data);
	});

	MessagingsRouter.get("/user/:id", async function (req, res) {
		const id = req.params.id;
		controller.getUserChats(res, id);
	});

	MessagingsRouter.get("/jobs/:id", async function (req, res) {
		const id = req.params.id;
		controller.getJobsChats(res, id);
	});

	MessagingsRouter.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getChat(res, id);
	});

	MessagingsRouter.delete("/:id", async function (req, res) {
		const id = req.params.id;
		controller.createTerminal(res, id);
	});

	return MessagingsRouter;
})();
