const { Op } = require("sequelize");
const commonsController = require("services/Commons/controller");
const {barcode, randomValueHex} = require("~/utils/generate");
const asyncLib = require("async");
const moment = require("moment");
const { 
	getRow,
	getPagingData,
	getPagination,
	getPaginationQueries,
	getField
 } = require("~/utils/common/thenCatch");
const {
	Users,
	Status,
	Discounts,
	Partners,
	Types_discounts,
	Tokens
} = require("./../../../models");

const { error, success } = require("utils/common/messages.json");
const { path } = require("utils/enum.json");
const { label_status } = require("utils/enum.json");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [
	{ model: Status, as: "status", attributes: excludeCommon },
	{
		model: Users,
		as: "user",
		attributes: { exclude: ["terminal_id", "status_id", "password"] },
		include: [
			{ model: Status, as: "status", attributes: excludeCommon },
		],
	},
	{
		model: Discounts,
		as: "discount",
		attributes: { exclude: ["type_disc_id","status_id","partner_id"] },
		required: true,
		include: [
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
		],
	},
]
const exclude = ["user_id","discount_id","status_id"];

module.exports = {
	getTransactions: async function (res, queries) {
		const {size,page,status} = queries
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		condition = Object.keys(condition).length === 0 ? null : condition;

		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(res, Tokens, condition, exclude, include, pagination);
	},
	getTransaction: function (res, id) {
		commonsController.getOne(res, Tokens, id, exclude, include);
	},
	getTransactionByCode: async function (res, code) {
		const data = await getRow(res, Tokens, { code }, include, exclude);
		return data;
	},
	createTransaction: async function (res, data) {
		const { discount_id, user_id } = data
		const statusData = await getRow(res, Status, { label: label_status.actived });
		const discountData = await getRow(res, Discounts, { id: discount_id });
		const userData = await getRow(res, Users, { id: user_id });
		data.status_id = statusData.id;
		data.code = randomValueHex(9);
		data.end_date = moment().add(discountData.duration, 'months').format("YYYY-MM-DD");

		if (parseInt(userData.total_token) < parseInt(discountData.cost)){
			return res
				.status(error.access_forbidden.status)
				.json({ entity: Tokens.name, message: "Insufficient user tokens"});
		} else {
			commonsController.create(
				async function (result) {
					const linkBarCode = await barcode(path.codebareDiscounts, result.code);
					asyncLib.waterfall([
						function (done) {
							result.update({ barcode: linkBarCode })
							.then(function() {
								done(null, result)
							}).catch(function(err) {
								return res
									.status(error.syntax_error.status)
									.json({ message: error.syntax_error.message });
							});
						},
						function (tokens, done) {
							Users.update(
								{ total_token: parseInt(userData.total_token) -  parseInt(discountData.cost)},
								{ where: { id: userData.id } }
							)
							.then(function() {
								done(Users)
							}).catch(function(err) {
								return res
									.status(error.syntax_error.status)
									.json({ message: error.syntax_error.message });
							});
						}
					  ],
					  function (Users) {
						if (Users)
							return res
								.status(success.create.status)
								.json({ entity: Tokens.name, message: success.create.message });
						else
							return res
								.status(error.op_failed.status)
								.json({ entity: Tokens.name, message: error.op_failed.message });
					  }
				  );
				},
				res,
				Tokens,
				data,
				null,
				null,
				true
			);
		}
		
	},
	updateTransaction: async function (res, id, data) {
		const {status_id} = data
		const statusData = await getRow(res, Status, { id: status_id });
		commonsController.update(res, Tokens, id, data);
	}
};

