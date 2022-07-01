const {
	Status,
	Partners,
	Discounts,
	Types_discounts
} = require("./../../../models");
const commonsController = require("services/Commons/controller");
const { label_status } = require("utils/enum.json");

const { getRow, getPaginationQueries } = require("utils/common/thenCatch");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [
	{ model: Status, as: "status", attributes: excludeCommon },
	{ 
		model: Partners, 
		as: "partner", 
		attributes: { exclude: ["status_id"] },
		include: [
			{ model: Status, as: "status", attributes: excludeCommon },
		]
	},
	{
		model: Types_discounts,
		as: "type",
		attributes: {
			exclude: ["status_id"],
		},
		include: [{ model: Status, as: "status", attributes: excludeCommon }],
	}
];

const exclude = ["status_id", "usertype_disc_id_id", "partner_id"];

module.exports = {
	getDiscounts: async function (res, queries) {
		const {size,page,status} = queries
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		condition = Object.keys(condition).length === 0 ? null : condition;

		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(res, Discounts, condition, exclude, include, pagination);
	},

	getDiscount: function (res, id) {
		commonsController.getOne(res, Discounts, id, exclude, include);
	},

	createDiscount: async function (res, data) {
		const { name, type_disc_id, partner_id } = data

		const statusData = await getRow(res, Status, { id: label_status.actived });
		const typeData = await getRow(res, Types_discounts, { id: type_disc_id });
		const partnerData = await getRow(res, Partners, { id: partner_id });
		const condition = { name };

		commonsController.create(null, res, Discounts, data, condition);

	},

	updateDiscount: async function (res, id, data) {
		const { name, type_disc_id } = data
		const typeData = await getRow(res, Types_discounts, { id: type_disc_id });
		const condition = {};
		if (name) condition.name = name;
		commonsController.update(res, Discounts, id, data, condition);
	},

	deleteDiscount: function (res, id) {
		commonsController.delete(res, Discounts, { id });
	}
};
