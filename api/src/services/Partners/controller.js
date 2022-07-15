const axios = require("axios");
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
	Types_discounts,
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
	},
];

const exclude = ["status_id", "user_id"];

module.exports = {
	getPartners: async function (res, queries) {
		const { size, page, status } = queries;
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		condition = Object.keys(condition).length === 0 ? null : condition;

		let pagination = getPaginationQueries(size, page);

		commonsController.getAll(
			res,
			Partners,
			condition,
			exclude,
			include,
			pagination
		);
	},

	getPartner: function (res, id) {
		commonsController.getOne(res, Partners, id, exclude, include);
	},

	createPartner: async function (res, data) {
		const { email, phone, type, typeValue } = data;
		/*
		const emailValid = await isEmailValid(email);
		if(emailValid !== "ok")
			return res
				.status(error.parameters.status)
				.json({ message: emailValid });
		*/

		const request = await axios.get(
			`https://entreprise.data.gouv.fr/api/sirene/v1/${type}/${typeValue}`
		);
		if (request.data.message) {
			return res
				.status(success.not_found.status)
				.json({ entity: type, message: request.data.message });
		}

		delete data.type;
		delete data.typeValue;
		data["name"] = request.data.siege_social.nom_raison_sociale;
		data["address"] =
			request.data.siege_social.l4_normalisee ||
			request.data.siege_social.l4_declaree ||
			`${request.data.siege_social.numero_voie} ${request.data.siege_social.type_voie} ${request.data.siege_social.libelle_voie}`;
		data["in_internet"] = false;
		data["in_store"] = false;

		const statusData = await getRow(res, Status, {
			label: label_status.requested,
		});
		data["status_id"] = statusData.id;

		const condition = { [Op.or]: [{ email }, { phone }] };

		commonsController.create(
			function (result) {
				const token = generateToken(result, true);
				//Send mail

				return res
					.status(success.create.status)
					.json({ entity: Partners.name, message: success.create.message });
			},
			res,
			Partners,
			data,
			condition,
			null,
			true
		);
	},

	updatePartner: async function (res, id, data) {
		const { phone, email, status_id } = data;
		const getCondition = [];
		if (phone) getCondition.push({ phone });
		if (email) {
			/*
			const emailValid = await isEmailValid(email);
			if(emailValid !== "ok")
				return res
					.status(error.parameters.status)
					.json({ message: emailValid });
			*/

			getCondition.push({ email });
		}
		const condition = { [Op.or]: [...getCondition] };

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
		const { status, size, page } = queries;

		let condition = { partner_id: id };
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}
		const excludeDiscounts = ["type_disc_id", "status_id"];
		const includeDiscounts = [
			{ model: Status, as: "status", attributes: excludeCommon },
			{
				model: Types_discounts,
				as: "type",
				attributes: {
					exclude: ["status_id"],
				},
				include: [{ model: Status, as: "status", attributes: excludeCommon }],
			},
		];
		let pagination = getPaginationQueries(size, page);

		commonsController.getAll(
			res,
			Discounts,
			condition,
			excludeDiscounts,
			includeDiscounts,
			pagination
		);
	},

	getTransactions: async function (res, id, queries) {
		const { size, page } = queries;
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
				attributes: { exclude: ["terminal_id", "status_id", "password"] },
				include: [{ model: Status, as: "status", attributes: excludeCommon }],
			},
			{
				model: Discounts,
				as: "discount",
				attributes: { exclude: ["type_disc_id", "status_id"] },
				required: true,
				include: [
					{ model: Status, as: "status", attributes: excludeCommon },
					{
						model: Types_discounts,
						as: "type",
						attributes: {
							exclude: ["status_id"],
						},
						include: [
							{ model: Status, as: "status", attributes: excludeCommon },
						],
					},
				],
				where: { partner_id: id },
			},
			{ model: Status, as: "status", attributes: excludeCommon },
		];
		let pagination = getPaginationQueries(size, page);
		condition = Object.keys(condition).length === 0 ? null : condition;

		commonsController.getAll(
			res,
			Tokens,
			condition,
			excludeTransactions,
			includeTransactions,
			pagination
		);
	},
};
