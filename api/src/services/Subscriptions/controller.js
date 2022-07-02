const moment = require("moment");
const {
	Status,
	Associations,
	Pricings,
	Subscriptions
} = require("./../../../models");
const commonsController = require("services/Commons/controller");

const { getRow, getPaginationQueries, getField, updateField } = require("utils/common/thenCatch");
const { error, success } = require("utils/common/messages.json");
const { label_status } = require("utils/enum.json");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [
	{ model: Status, as: "status", attributes: excludeCommon },
	{ 
		model: Pricings, 
		as: "pricing", 
		attributes: { exclude: ["status_id"] },
		include: [
			{ model: Status, as: "status", attributes: excludeCommon },
		]
	},
	{
		model: Associations,
		as: "organization",
		attributes: {
			exclude: ["status_id"],
		},
		include: [{ model: Status, as: "status", attributes: excludeCommon }],
	}
];

const exclude = ["pricing_id", "assos_id", "status_id"];

module.exports = {
	getSubscriptions: async function (res, queries) {
		const {size,page,status} = queries
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		condition = Object.keys(condition).length === 0 ? null : condition;

		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(res, Subscriptions, condition, exclude, include, pagination);
	},

	getSubscription: function (res, id) {
		commonsController.getOne(res, Subscriptions, id, exclude, include);
	},

	createSubscription: async function (res, data) {
		const { pricing_id, assos_id } = data

		const statusData = await getRow(res, Status, { label: label_status.actived });
		const pricingData = await getRow(res, Pricings, { id: pricing_id });
		const associationData = await getRow(res, Associations, { id: assos_id });
		const condition = { assos_id };
		
		data.current = 1;
		data.status_id = statusData.id;
		if(pricingData.label !== "Standard") data.expirate = moment().add(pricingData.duration, 'months').format("YYYY-MM-DD");

		commonsController.create(null, res, Subscriptions, data, condition);
	},

	updateSubscription: async function (res, id, data) {
		const {status_id} = data
		if (status_id) {
			const statusData = await getRow(res, Status, { id: status_id });
		}
		commonsController.update(res, Subscriptions, id, data);
	},
};
