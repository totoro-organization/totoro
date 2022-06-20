
const axios = require("axios");
const { success } = require("utils/common/messages.json");
const { label_status } = require("utils/enum.json");
const mailer = require("services/externals/mailer");
const {
  mail: { signup },
} = require("./../../../html");
const { from, subject, host } = require("utils/common/mail.json");
const { generateToken } = require("utils/session");
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
	Tags
} = require("./../../../models");
const commonsController = require("services/Commons/controller");

const { getRow, getPaginationQueries } = require("utils/common/thenCatch");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [
	{ model: Status, as: "status", attributes: excludeCommon },
	{
		model: Associations_users,
		as: "users",
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
	}
];

const exclude = ["status_id"];

module.exports = {
	getOrganizations: async function (res, queries) {
		const {size,page,status} = queries
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		condition = Object.keys(condition).length === 0 ? null : condition;

		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(res, Associations, condition, exclude, include, pagination);
	},

	getOrganization: function (res, id) {
		commonsController.getOne(res, Associations, id, exclude, include);
	},

	createOrganization: async function (res, data) {
		const { email, phone, type, typeValue } = data
		const request = await axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/${type}/${typeValue}`);
		if(request.data.message){
			return res
					.status(success.not_found.status)
					.json({ entity: type, message: request.data.message });
		}

		delete data.type
		delete data.typeValue
		data["siren"] = request.data.siege_social.siren
		data["siret"] = request.data.siege_social.siret
		data["name"] = request.data.siege_social.nom_raison_sociale
		data["longitude"] = parseFloat(request.data.siege_social.longitude)
		data["latitude"] = parseFloat(request.data.siege_social.latitude)
		data["creation_date"] = `${request.data.siege_social.date_creation.substring(0, 4)}-${request.data.siege_social.date_creation.substring(4, 6)}-${request.data.siege_social.date_creation.substring(6, 8)}`
		data["activity"] = request.data.siege_social.libelle_activite_principale
		data["address"] = request.data.siege_social.l4_normalisee || request.data.siege_social.l4_declaree || `${request.data.siege_social.numero_voie} ${request.data.siege_social.type_voie} ${request.data.siege_social.libelle_voie}`
		data["cp"] = request.data.siege_social.code_postal
		data["commune"] = request.data.siege_social.libelle_commune
		data["logo"] = "/logo/default.svg";

		const statusData = await getRow(res, Status, { label: label_status.requested });
		data["status_id"] = statusData.id;

		const condition = { email, phone, siren: data.siren, siret: data.siret };

		commonsController.create(function(result){
				const token = generateToken(result, true);
				if(!mailer.sendMail(
					host.gmail,
					from.email,
					from.password,
					result.email,
					subject.signup,
					signup(result, token)
				)){
					console.log("mail inexistant");
				}

				return res
					.status(success.create.status)
					.json({ entity: Associations.name, message: success.create.message });
		},
		res, Associations, data, condition, null, true);
	},

	updateOrganization: function (res, id, data) {
		const {phone, email} = data
		const condition = {};
		if (phone) condition.phone = phone;
		if (email) condition.email = email;
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
		if(statusData.label === "deleted" || statusData.label === "denied" || statusData.label === "closed" ){
			commonsController.delete(res, Associations_users, { id }, true);
		} 
		else {
			commonsController.update(res, Associations_users, id, data);
		}
	},

	updateMemberOrganization: async function (res, id, data) {
		const {role_id, status_id} = data
		const roleData = await getRow(res, Roles, { id: role_id });
		const statusData = await getRow(res, Status, { id: status_id });

		commonsController.update(res, Associations_users, id, data);
	},

	getOrganizationJobs: async function (res, id, queries) {
		const {status, size, page} = queries

		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}
		const excludeJobs = ["assos_user_id","difficulty_id","status_id"];
		const includeJobs = [
			{ model: Status, as: "status", attributes: excludeCommon },
			{ model: Difficulties, as: "difficulty", attributes: excludeCommon },
			{ model: Attachment_jobs, as: "attachments", attributes: excludeCommon },
			{
				model: Associations_users,
				as: "author",
				required: true,
				attributes: {
					exclude: ["user_id", "role_id", "status_id","createdAt","updatedAt"],
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
					{ model: Status, as: "status", attributes: excludeCommon }
				],
				where: {assos_id: id}
			},
			{
				model: Tag_jobs,
				as: "tags",
				attributes: {exclude: ["jobs_id","tag_id","createdAt", "updatedAt"]},
				include: [{ model: Tags,     required: true, as: "tag", attributes: excludeCommon }]
			}
		]
		let pagination = getPaginationQueries(size,page)
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
		const {size, page} = queries

		const excludeFavorites = ["user_id"];
		const includeFavorites = [
			{
				model: Users,
				as: "user",
				attributes: { exclude:["terminal_id", "status_id", "password"] },
				include: [
					{ model: Status, as: "status", attributes: excludeCommon },
				],
			}
		]
		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(res, Favorites, {assos_id: id}, excludeFavorites, includeFavorites, pagination);
	},

	getMembers: async function (res, id, queries) {
		const {status, size, page} = queries

		let condition = {assos_id: id};
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
		
		let pagination = getPaginationQueries(size,page)

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
		const {user_id, assos_id} = data
		let condition = {user_id, assos_id}
		commonsController.create(null, res, Associations_users, data, condition);
	},
};
