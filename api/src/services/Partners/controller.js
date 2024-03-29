const { getAllByInsee } = require("~externals/insee");
const { Op } = require("sequelize");
const { success, error } = require("~utils/common/messages.json");
const { label_status } = require("~utils/enum.json");
const { isEmailValid } = require("~utils/verify");

//Send mail
const { from, subject, host } = require("~utils/common/mail.json");
const { generateToken } = require("~utils/session");
const {
	Users,
	Status,
	Tokens,
	Partners,
	Discounts,
	Types_discounts
} = require("~orm/models");
const commonsController = require("~services/Commons/controller");

const { getRow, getPaginationQueries } = require("~utils/common/thenCatch");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [
	{ model: Status, as: "status", attributes: excludeCommon },
	{
		model: Users,
		as: "user",
		attributes: {
			exclude: ["terminal_id", "status_id", "password"],
		},
		include: [{ model: Status, as: "status", attributes: excludeCommon }],
	}
];

const exclude = ["status_id", "user_id"];

module.exports = {
	getPartners: async function (res, queries) {
		const {size,page,status, order} = queries
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		condition = Object.keys(condition).length === 0 ? null : condition;

		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(res, Partners, condition, exclude, include, pagination, order);
	},

	getPartner: function (res, id) {
		commonsController.getOne(res, Partners, id, exclude, include);
	},

	createPartner: async function (res, data) {
		const { email, phone, siret } = data
		/*
		const emailValid = await isEmailValid(email);
		if(emailValid !== "ok")
			return res
				.status(error.parameters.status)
				.json({ message: emailValid });
		*/

		
		data = await getAllByInsee("siret", siret, data, "partner");

		if(data.statut && data.message){
			return res
					.status(data.statut)
					.json({ entity: 'siret', message: data.message });
		}

		data["in_internet"] = false;
		data["in_store"] = false

		const statusData = await getRow(res, Status, { label: label_status.requested });
		data["status_id"] = statusData.id;

		const condition = {[Op.or]: [{ email },{ phone }],};


		commonsController.create(function(result){
				const token = generateToken(result, true);
				//Send mail

				return res
					.status(success.create.status)
					.json({ entity: Partners.name, message: success.create.message });
		},
		res, Partners, data, condition, null, true);
	},

	updatePartner: async function (res, id, data) {
		const {phone, email, status_id} = data
		const getCondition = [];
		if (phone) getCondition.push({phone});
		if (email) {
			/*
			const emailValid = await isEmailValid(email);
			if(emailValid !== "ok")
				return res
					.status(error.parameters.status)
					.json({ message: emailValid });
			*/
			
			getCondition.push({email})
		};
		const condition = {[Op.or]: [...getCondition],};

		const statusData = await getRow(res, Status, { id: status_id });

		commonsController.update(res, Partners, id, data, condition);
	},

	updateLogo: function (res, id, data) {
		commonsController.update(res, Partners, id, data);
	},

	deletePartner: function (res, id) {
		commonsController.delete(res, Partners, { id });
	},

	getPartnerDiscounts: async function (res, id, queries) {
		const {status, size, page, order} = queries

		let condition = {partner_id: id};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}
		const excludeDiscounts = ["type_disc_id","status_id"];
		const includeDiscounts = [
			{ model: Status, as: "status", attributes: excludeCommon },
			{
				model: Types_discounts,
				as: "type",
				attributes: {
					exclude: ["status_id"],
				},
				include: [{ model: Status, as: "status", attributes: excludeCommon }],
			}
		]
		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(
			res,
			Discounts,
			condition,
			excludeDiscounts,
			includeDiscounts,
			pagination, 
			order
		);
	},

	getTransactions: async function (res, id, queries) {
		const {size, page, status, order} = queries
		let condition = {};

		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		const excludeTransactions = ["discount_id", "user_id", "status_id"];
		const includeTransactions = [
			{
				model: Users,
				as: "user",
				attributes: { exclude:["terminal_id", "status_id", "password"] },
				include: [
					{ model: Status, as: "status", attributes: excludeCommon },
				],
			},
			{
				model: Discounts,
				as: "discount",
				attributes: { exclude: ["type_disc_id","status_id"] },
				required: true,
				include: [
					{ model: Status, as: "status", attributes: excludeCommon },
					{
						model: Types_discounts,
						as: "type",
						attributes: {
							exclude: ["status_id"],
						},
						include: [{ model: Status, as: "status", attributes: excludeCommon }],
					}
				],
				where: { partner_id: id }
			},
			{ model: Status, as: "status", attributes: excludeCommon },
		]
		let pagination = getPaginationQueries(size,page)
		condition = Object.keys(condition).length === 0 ? null : condition;

		commonsController.getAll(res, Tokens, condition, excludeTransactions, includeTransactions, pagination, order);
	}
};
