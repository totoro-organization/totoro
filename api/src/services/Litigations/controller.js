const { label_status } = require("~utils/enum.json");
const {
	Users,
	Status,
	Difficulties,
	Associations,
	Litigations,
	Litigation_objects,
	Jobs,
	Groups,
	Associations_users,
} = require("~orm/models");
const commonsController = require("~services/Commons/controller");
const { getRow, getPaginationQueries } = require("~utils/common/thenCatch");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const exclude = ["litigation_object_id", "group_id", "status_id"];

const include = [
	{ model: Status, as: "status", attributes: excludeCommon },
	{
		model: Litigation_objects,
		as: "litigation_object",
		attributes: excludeCommon,
	},
	{
		model: Groups,
		as: "mission",
		attributes: { exclude: ["status_id", "user_id", "jobs_id"] },
		include: [
			{
				model: Jobs,
				as: "job",
				attributes: {
					exclude: ["assos_user_id", "status_id", "difficulty_id"],
				},
				include: [
					{ model: Status, as: "status", attributes: excludeCommon },
					{ model: Difficulties, as: "difficulty", attributes: excludeCommon },
					{
						model: Associations_users,
						as: "author",
						exclude: [
							"user_id",
							"assos_id",
							"role_id",
							"status_id",
							"createdAt",
							"updatedAt",
						],
						include: [
							{
								model: Associations,
								as: "organization",
								attributes: { exclude: ["status_id"] },
								include: [
									{ model: Status, as: "status", attributes: excludeCommon },
								],
							},
						],
					},
				],
			},
			{
				model: Users,
				as: "participant",
				attributes: { exclude: ["terminal_id", "status_id", "password"] },
				include: [{ model: Status, as: "status", attributes: excludeCommon }],
			},
			{ model: Status, as: "status", attributes: excludeCommon },
		],
	},
];

module.exports = {
	getLitigations: async function (res, queries) {
		const { status, size, page } = queries;
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		condition = Object.keys(condition).length === 0 ? null : condition;

		let pagination = getPaginationQueries(size, page);

		commonsController.getAll(
			res,
			Litigations,
			condition,
			exclude,
			include,
			pagination
		);
	},
	getLitigation: function (res, id) {
		commonsController.getOne(res, Litigations, id, exclude, include);
	},
	createLitigation: async function (res, data) {
		const { group_id, litigation_object_id } = data;
		const group = await getRow(res, Litigation_objects, {
			id: litigation_object_id,
		});
		const object = await getRow(res, Groups, { id: group_id });
		const statusData = await getRow(res, Status, {
			label: label_status.opened,
		});

		data.status_id = statusData.id;
		commonsController.create(null, res, Litigations, data);
	},
	updateLitigation: async function (res, id, data) {
		const { status_id } = data;

		const status = await getRow(res, Status, { id: status_id });
		commonsController.update(res, Users, id, data);
	},
	deleteLitigation: function (res, id) {
		commonsController.delete(res, Litigations, { id });
	},
};
