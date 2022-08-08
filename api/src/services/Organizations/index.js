const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");
const { path } = require("~utils/enum.json");
const { upload } = require("~utils/storage");
const { getRow } = require("~utils/common/thenCatch");
const { Status, Roles, Users } = require("~orm/models");
const { label_status, role } = require("~utils/enum.json");

exports.router = (function () {
	const organizationsRouter = express.Router();

	organizationsRouter
	.get("/", async function (req, res) {
		controller.getOrganizations(res, req.query);
	})

	.post("/", [
		passport,
		async function (req, res) {
			const data = req.body;
			data["user_id"] = req.userData.id;
			controller.createOrganization(res, data);
		},
	])

	.get("/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOrganization(res, id);
	})

	.put("/:id", [passport, async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.updateOrganization(res, id, data);
	}])

	.delete("/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.deleteOrganization(res, id);
		},
	])

	.get("/:id/jobs", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getOrganizationJobs(res, id, req.query);
		},
	])


	.get("/:id/members", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getMembers(res, id, req.query);
		},
	])

	.get("/:id/favorites", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getFavorites(res, id, req.query);
		},
	])

	.get("/:id/current-subscription", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getCurrentSubscription(res, id);
		},
	])

	.get("/:id/subscriptions", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.getSubscriptions(res, id, req.query);
		},
	])

	.post("/:id/request", [
		passport,
		async function (req, res) {
			const data = req.body;
			const statusData = await getRow(res, Status, { label: label_status.requested });
			data["status_id"] = statusData.id;			
			const roleData = await getRow(res, Roles, { label: role.moderator });
			data["role_id"] = roleData.id;
			data["assos_id"] = req.params.id;
			data["user_id"] = req.userData.id;
			controller.addToOrganization(res, data);
		},
	])
                                                                                    

	.post("/:id/invite", async function (req, res) {
		const data = req.body;
		const statusData = await getRow(res, Status, { label: label_status.invited });
		data["status_id"] = statusData.id;		
		const roleData = await getRow(res, Roles, { label: role.moderator });
		const userData = await getRow(res, Users, { id: data.user_id });
		data["role_id"] = roleData.id;
		data["assos_id"] = req.params.id;

		controller.addToOrganization(res, data);
	})

	.put("/response/:memberId", [
		passport,
		async function (req, res) {
			const id = req.params.memberId;
			const data = req.body;
			controller.responseMemberOrganization(res, id, data);
		},
	])

	.put("/member/:memberId", [
		passport,
		async function (req, res) {
			const id = req.params.memberId;
			const data = req.body;
			controller.updateMemberOrganization(res, id, data);
		},
	])

	.put("/logo/:id", [passport, upload(path.logo).single("logo"), async function (req, res) {
		const id = req.params.id;
		const data = {};
		if (req.file) {
			data.file = req.file;
			data.path = path.logo;
		}

		controller.updateLogo(res, id, data);
	}])

	.put("/banner/:id", [passport, upload(path.logo).single("banner"), async function (req, res) {
		const id = req.params.id;
		const data = {};
		if (req.file) {
			data.file = req.file;
			data.path = path.logo;
		}

		controller.updateLogo(res, id, data);
	}])

	.put("/:id/subscriptions/change", [passport, async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		controller.changeSubscription(res, id, data);
	}]);


	return organizationsRouter;
})();
