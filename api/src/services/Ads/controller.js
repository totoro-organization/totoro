const models = require("./../../../models");
const asyncLib = require("async");
const { Op } = require("sequelize");
const commonsController = require("services/Commons/controller");
const { getRow } = require("~/utils/common/thenCatch");
const { Ads, Status } = require("./../../../models");

module.exports = {
	getAds: async function (res, queries = null) {
		let condition = {};
		if (queries && queries.status) {
			let statusData = await getRow(res, Status, { label: queries.status });
			condition.status_id = statusData.id;
		}

		condition = Object.keys(condition).length === 0 ? null : condition;
		commonsController.getAll(res, Ads, condition);
	},
	getAd: function (res, id) {
		commonsController.getOne(res, Ads, id);
	},
	createAd: function (res, data) {},
	updateAd: function (res, id, data) {},
	deleteAd: function (res, id) {
		commonsController.delete(res, Ads, { id });
	},
};
