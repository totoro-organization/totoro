const models = require("./../../../models");
const asyncLib = require("async");
const { Op } = require("sequelize");
const commonsController = require("services/Commons/controller");
const { getRow } = require("~/utils/common/thenCatch");
const { label_status } = require("utils/enum.json");
const {
	Users,
	Status,
	Difficulties,
	Tags,
	Tag_jobs,
	Attachment_jobs,
	Associations,
	Litigations,
	Litigation_objects,
	Jobs,
	Favorites,
	Groups,
	Associations_users,
} = require("./../../../models");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [
	{ model: Status, as: "status", attributes: excludeCommon },
	{ model: Difficulties, as: "difficulty", attributes: excludeCommon },
	{ model: Attachment_jobs, as: "attachments", attributes: excludeCommon },
	{
		model: Associations_users,
		as: "author",
		attributes: {
			exclude: ["id", "user_id", "assos_id", "role_id", "status_id","createdAt","updatedAt"],
		},
		include: [
			{
				model: Associations,
				as: "organization",
				attributes: { exclude: ["status_id"] },
				include: [
					{ model: Status, as: "status", attributes: excludeCommon },
				],
			},
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
	},
	{
		model: Tag_jobs,
		as: "tags",
		attributes: excludeCommon,
		include: [{ model: Tags, as: "tag", attributes: excludeCommon }]
	}

]
const exclude = ["assos_user_id","difficulty_id","status_id"];

module.exports = {
	getJobs: async function (res, queries = null) {
		let condition = {};
		if (queries && queries.status) {
			let statusData = await getRow(res, Status, { label: queries.status });
			condition.status_id = statusData.id;
		}

		condition = Object.keys(condition).length === 0 ? null : condition;
		commonsController.getAll(res, Jobs, condition, exclude, include);
	},
	getJob: function (res, id) {
		commonsController.getOne(res, Jobs, id, exclude, include);
	},
	createJob: async function (res, data) {
		const statusData = await getRow(res, Status, { label: label_status.disabled });
		const difficultyData = await getRow(res, Difficulties, { id: data.difficulty_id });
		const authorData = await getRow(res, Associations_users, { id: data.assos_user_id });
	},
	updateJob: async function (res, id, data) {
		const condition = {};
		if(data.title) condition.title = data.title;

		if (data.status_id) {
			const assos = await getRow(res, Status, { id: data.status_id });
		}

		if (data.difficulty_id) {
			const assos = await getRow(res, Difficulties, { id: data.difficulty_id });
		}
		
		commonsController.update(res, Jobs, id, data, condition);
	},
	deleteJob: function (res, id) {
		commonsController.delete(res, Jobs, { id });
	},
};
