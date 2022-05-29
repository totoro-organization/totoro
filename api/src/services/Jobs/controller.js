const models = require("./../../../models");
const asyncLib = require("async");
const { Op } = require("sequelize");
const commonsController = require("services/Commons/controller");
const { getRow } = require("~/utils/common/thenCatch");
const { Jobs, Status } = require("./../../../models");

module.exports = {
	getJobs: async function (res, queries = null) {
		let condition = {};
		if (queries && queries.status) {
			let statusData = await getRow(res, Status, { label: queries.status });
			condition.status_id = statusData.id;
		}

		condition = Object.keys(condition).length === 0 ? null : condition;
		commonsController.getAll(res, Jobs, condition);
	},
	getJob: function (res, id) {
		commonsController.getOne(res, Jobs, id);
	},
	createJob: function (res, data) {},
	updateJob: function (res, id, data) {},
	deleteJob: function (res, id) {
		commonsController.delete(res, Jobs, { id });
	},
};
