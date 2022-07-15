const axios = require("axios");
const moment = require("moment");
const { Op } = require("sequelize");
const asyncLib = require("async");
const { success, error } = require("~utils/common/messages.json");
const { label_status, role } = require("~utils/enum.json");
const { isEmailValid } = require("~utils/verify");

//Send mail
const { from, subject, host } = require("~utils/common/mail.json");
const { generateToken } = require("~utils/session");
const {
	Users,
	Status,
	Difficulties,
	Roles,
	Associations,
	Jobs,
	Favorites,
	Associations_users,
	Attachment_jobs,
	Tag_jobs,
	Tags,
	Subscriptions,
	Pricings,
} = require("~orm/models");
const commonsController = require("~services/Commons/controller");
const {
	getRow,
	getPaginationQueries,
	getField,
	updateField,
} = require("~utils/common/thenCatch");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [
	{ model: Status, as: "status", attributes: excludeCommon },
	{
		model: Associations_users,
		as: "members",
		attributes: {
			exclude: ["user_id", "assos_id", "role_id", "status_id"],
		},
		include: [
			{
				model: Users,
				as: "user",
				attributes: { exclude: ["terminal_id", "status_id", "password"] },
				include: [{ model: Status, as: "status", attributes: excludeCommon }],
			},
			{ model: Roles, as: "role", attributes: excludeCommon },
			{ model: Status, as: "status", attributes: excludeCommon },
		],
	},
];

const exclude = ["status_id"];

module.exports = {
	getOrganizations: async function (res, queries) {
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
			Associations,
			condition,
			exclude,
			include,
			pagination
		);
	},

	getOrganization: function (res, id) {
		commonsController.getOne(res, Associations, id, exclude, include);
	},

	createOrganization: async function (res, data) {
		const { email, phone, type, typeValue, user_id } = data;

		/*
		const emailValid = await isEmailValid(email);
		if(emailValid !== "ok")
			return res
				.status(error.parameters.status)
				.json({ message: emailValid });
		*/

		const activeStatus = await getRow(Status, { label: label_status.actived });
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
		data["siren"] = request.data.siege_social.siren;
		data["siret"] = request.data.siege_social.siret;
		data["name"] = request.data.siege_social.nom_raison_sociale;
		data["longitude"] = parseFloat(request.data.siege_social.longitude);
		data["latitude"] = parseFloat(request.data.siege_social.latitude);
		data[
			"creation_date"
		] = `${request.data.siege_social.date_creation.substring(
			0,
			4
		)}-${request.data.siege_social.date_creation.substring(
			4,
			6
		)}-${request.data.siege_social.date_creation.substring(6, 8)}`;
		data["activity"] = request.data.siege_social.libelle_activite_principale;
		data["address"] =
			request.data.siege_social.l4_normalisee ||
			request.data.siege_social.l4_declaree ||
			`${request.data.siege_social.numero_voie} ${request.data.siege_social.type_voie} ${request.data.siege_social.libelle_voie}`;
		data["cp"] = request.data.siege_social.code_postal;
		data["commune"] = request.data.siege_social.libelle_commune;

		const statusData = await getRow(res, Status, {
			label: label_status.requested,
		});
		data["status_id"] = statusData.id;

		const condition = {
			[Op.or]: [
				{ email },
				{ phone },
				{ siren: data.siren },
				{ siret: data.siret },
			],
		};

		commonsController.create(
			async function (resultCreateAssociation) {
				const statusDataAdd = await getRow(res, Status, {
					label: label_status.actived,
				});
				const roleDataAdd = await getRow(res, Roles, {
					label: role.administrator,
				});

				const dataAdd = {
					user_id,
					assos_id: resultCreateAssociation.id,
					status_id: statusDataAdd.id,
					role_id: roleDataAdd.id,
				};
				commonsController.create(
					function (resultAddToAssos) {
						const token = generateToken(resultCreateAssociation, true);
						//Send mail

						return res
							.status(success.create.status)
							.json({
								entity: Associations.name,
								message: success.create.message,
							});
					},
					res,
					Associations_users,
					dataAdd,
					null,
					null,
					true
				);
			},
			res,
			Associations,
			data,
			condition,
			null,
			true
		);
	},

	updateOrganization: async function (res, id, data) {
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

		commonsController.update(res, Associations, id, data, condition);
	},

	updateLogo: function (res, id, data) {
		commonsController.update(res, Associations, id, data);
	},

	deleteOrganization: function (res, id) {
		commonsController.delete(res, Associations, { id });
	},

	responseMemberOrganization: async function (res, id, data) {
		const statusData = await getRow(res, Status, { id: data.status_id });
		if (
			statusData.label === "deleted" ||
			statusData.label === "denied" ||
			statusData.label === "closed"
		) {
			commonsController.delete(res, Associations_users, { id }, true);
		} else {
			commonsController.update(res, Associations_users, id, data);
		}
	},

	updateMemberOrganization: async function (res, id, data) {
		const { role_id, status_id } = data;
		const roleData = await getRow(res, Roles, { id: role_id });
		const statusData = await getRow(res, Status, { id: status_id });

		commonsController.update(res, Associations_users, id, data);
	},

	getOrganizationJobs: async function (res, id, queries) {
		const { status, size, page } = queries;

		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}
		const excludeJobs = ["assos_user_id", "difficulty_id", "status_id"];
		const includeJobs = [
			{ model: Status, as: "status", attributes: excludeCommon },
			{ model: Difficulties, as: "difficulty", attributes: excludeCommon },
			{
				model: Attachment_jobs,
				as: "attachments",
				attributes: excludeCommon,
				order: [["createdAt", "ASC"]],
			},
			{
				model: Associations_users,
				as: "author",
				required: true,
				attributes: {
					exclude: [
						"user_id",
						"role_id",
						"status_id",
						"createdAt",
						"updatedAt",
					],
				},
				include: [
					{
						model: Users,
						as: "user",
						attributes: { exclude: ["terminal_id", "status_id", "password"] },
						include: [
							{ model: Status, as: "status", attributes: excludeCommon },
						],
					},
					{ model: Status, as: "status", attributes: excludeCommon },
				],
				where: { assos_id: id },
			},
			{
				model: Tag_jobs,
				as: "tags",
				attributes: {
					exclude: ["jobs_id", "tag_id", "createdAt", "updatedAt"],
				},
				include: [
					{ model: Tags, required: true, as: "tag", attributes: excludeCommon },
				],
			},
		];
		let pagination = getPaginationQueries(size, page);
		condition = Object.keys(condition).length === 0 ? null : condition;

		commonsController.getAll(
			res,
			Jobs,
			condition,
			excludeJobs,
			includeJobs,
			pagination
		);
	},

	getFavorites: async function (res, id, queries) {
		const { size, page } = queries;

		const excludeFavorites = ["user_id"];
		const includeFavorites = [
			{
				model: Users,
				as: "user",
				attributes: { exclude: ["terminal_id", "status_id", "password"] },
				include: [{ model: Status, as: "status", attributes: excludeCommon }],
			},
		];
		let pagination = getPaginationQueries(size, page);

		commonsController.getAll(
			res,
			Favorites,
			{ assos_id: id },
			excludeFavorites,
			includeFavorites,
			pagination
		);
	},

	getMembers: async function (res, id, queries) {
		const { status, size, page } = queries;

		let condition = { assos_id: id };
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}
		const excludeMembers = ["user_id", "role_id", "status_id"];
		const includeMembers = [
			{
				model: Users,
				as: "user",
				attributes: { exclude: ["status_id"] },
				include: [{ model: Status, as: "status", attributes: excludeCommon }],
			},
			{ model: Roles, as: "role", attributes: excludeCommon },
			{ model: Status, as: "status", attributes: excludeCommon },
		];

		let pagination = getPaginationQueries(size, page);

		commonsController.getAll(
			res,
			Associations_users,
			condition,
			excludeMembers,
			includeMembers,
			pagination
		);
	},

	addToOrganization: async function (res, data) {
		const { user_id, assos_id } = data;
		let condition = { user_id, assos_id };
		commonsController.create(null, res, Associations_users, data, condition);
	},

	getSubscriptions: async function (res, id, queries) {
		const { status, size, page } = queries;

		let condition = { assos_id: id };
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}
		const excludeSub = ["pricing_id", "assos_id", "status_id"];
		const includeSub = [
			{
				model: Associations,
				as: "organization",
				attributes: { exclude: ["status_id"] },
				include: [{ model: Status, as: "status", attributes: excludeCommon }],
			},
			{
				model: Pricings,
				as: "pricing",
				attributes: excludeCommon,
				include: [{ model: Status, as: "status", attributes: excludeCommon }],
			},
			{ model: Status, as: "status", attributes: excludeCommon },
		];

		let pagination = getPaginationQueries(size, page);

		commonsController.getAll(
			res,
			Subscriptions,
			condition,
			excludeSub,
			includeSub,
			pagination
		);
	},

	getCurrentSubscription: function (res, id) {
		const current = true;
		const excludeSub = ["pricing_id", "status_id"];
		const includeSub = [
			{
				model: Pricings,
				as: "pricing",
				attributes: excludeCommon,
				include: [{ model: Status, as: "status", attributes: excludeCommon }],
			},
			{ model: Status, as: "status", attributes: excludeCommon },
		];

		const params = {
			include: includeSub,
			attributes: { exclude: excludeSub },
			where: { id, current },
		};

		Subscriptions.findOne(params)
			.then((result) => {
				if (result) return res.status(200).json(result);
				else
					return res
						.status(error.not_found.status)
						.json({ message: error.not_found.message });
			})
			.catch((err) => {
				return res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},

	changeSubscription: async function (res, id, data) {
		asyncLib.waterfall(
			[
				function (done) {
					getField(
						res,
						Subscriptions,
						{ assos_id: id, current: true },
						done,
						true
					);
				},
				async function (found, done) {
					if (!found) {
						return res
							.status(error.not_found.status)
							.json({
								entity: Associations.name,
								message: error.not_found.message,
							});
					} else {
						const statusData = await getRow(res, Status, {
							label: label_status.disabled,
						});
						updateField(
							res,
							found,
							{ status_id: statusData.id, current: false },
							done
						);
					}
				},
			],
			async function (updateFound) {
				if (updateFound) {
					const { pricing_id } = data;
					const statusData = await getRow(res, Status, {
						label: label_status.actived,
					});
					const pricingData = await getRow(res, Pricings, { id: pricing_id });

					data.current = 1;
					data.status_id = statusData.id;
					if (pricingData.label !== "Standard")
						data.expirate = moment()
							.add(pricingData.duration, "months")
							.format("YYYY-MM-DD");

					commonsController.create(null, res, Subscriptions, data);
				} else
					return res
						.status(error.op_failed.status)
						.json({
							entity: Subscriptions.name,
							message: error.op_failed.message,
						});
			}
		);
	},
};
