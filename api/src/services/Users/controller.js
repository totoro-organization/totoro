const bcrypt = require("bcryptjs");
const asyncLib = require("async");
const { Op } = require("sequelize");
const { error, success } = require("utils/common/messages.json");
const {
	Users,
	Status,
	Difficulties,
	Roles,
	Associations,
	Litigations,
	Litigation_objects,
	Jobs,
	Favorites,
	Groups,
	Associations_users,
} = require("./../../../models");
const commonsController = require("services/Commons/controller");

const { getRow, getField, updateField } = require("utils/common/thenCatch");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [
	{ model: Status, as: "status", attributes: excludeCommon },
	{
		model: Associations_users,
		as: "memberships",
		attributes: {
			exclude: ["id", "user_id", "assos_id", "role_id", "status_id"],
		},
		include: [
			{
				model: Associations,
				as: "organization",
				attributes: { exclude: ["status_id"] },
				include: [{ model: Status, as: "status", attributes: excludeCommon }],
			},
			{ model: Roles, as: "role", attributes: excludeCommon },
			{ model: Status, as: "status", attributes: excludeCommon },
		],
	},
];

const exclude = ["terminal_id", "status_id", "password"];

const includeUser = [
	{
		model: Jobs,
		as: "job",
		attributes: { exclude: ["assos_user_id", "status_id", "difficulty_id"] },
		include: [
			{ model: Status, as: "status", attributes: excludeCommon },
			{ model: Difficulties, as: "difficulty", attributes: excludeCommon },
			{
				model: Associations_users,
				as: "author",
				attributes: {
					exclude: ["id", "user_id", "assos_id", "role_id", "status_id"],
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
						attributes: { exclude },
						include: [
							{ model: Status, as: "status", attributes: excludeCommon },
						],
					},
					{ model: Status, as: "status", attributes: excludeCommon },
				],
			},
		],
	},
	{ model: Status, as: "status", attributes: excludeCommon },
];

module.exports = {
	getUsers: async function (res, queries = null) {
		let condition = {};
		if (queries && queries.status) {
			let statusData = await getRow(res, Status, { label: queries.status });
			condition.status_id = statusData.id;
		}

		condition = Object.keys(condition).length === 0 ? null : condition;
		commonsController.getAll(res, Users, condition, exclude, include);
	},

	getUser: function (res, id) {
		commonsController.getOne(res, Users, id, exclude, include);
	},

	updateUser: function (res, id, data) {
		const condition = {};
		if (data.email) condition.email = data.email;
		commonsController.update(res, Users, id, data, condition);
	},
  updateAvatar: function (res, id, data) {
		commonsController.update(res, Users, id, data);
  },

  deleteUser: function (res, id) {
    commonsController.delete(res, Users, { id });
  },

	resetPassword: async function (res, data) {
		asyncLib.waterfall(
			[
				function (done) {
					const condition = { id: data.id };
					getField(res, Users, condition, done, true, include);
				},
				function (user, done) {
					if (user) {
						bcrypt.compare(
							data.old_password,
							user.password,
							(errByCrypt, resByCrypt) => {
								done(null, user, resByCrypt);
							}
						);
					} else {
						return res.status(error.access_forbidden.status).json({
							entity: Users.name,
							message: error.access_forbidden.message,
						});
					}
				},
				function (user, resByCrypt, done) {
					if (resByCrypt) {
						const updateData = { password: data.password };
						updateField(res, user, updateData, done);
					} else {
						return res.status(error.access_forbidden.status).json({
							entity: Users.name,
							message: error.access_forbidden.message,
						});
					}
				},
			],
			function (updateFound) {
				if (updateFound)
					return res
						.status(success.update.status)
						.json({ entity: Users.name, message: success.update.message });
				else
					return res
						.status(error.op_failed.status)
						.json({ entity: Users.name, message: error.op_failed.message });
			}
		);
	},

	getFavorites: function (res, id) {
		const includeFavorites = [...includeUser];
		includeFavorites.splice(-1);
		includeFavorites.push({
			model: Associations,
			as: "organization",
			attributes: { exclude: ["status_id"] },
			include: [{ model: Status, as: "status", attributes: excludeCommon }],
		});
		const condition = { user_id: id };
		commonsController.getAll(
			res,
			Favorites,
			condition,
			["assos_id", "jobs_id", "status_id"],
			includeFavorites
		);
	},

	createFavorite: async function (res, data) {
		const condition = {};
		if ((!data.assos_id && !data.jobs_id) || (data.assos_id && data.jobs_id))
			return res
				.status(error.parameters.status)
				.json({ message: "send assos_id or jobs_id in data" });

		if (data.assos_id) {
			const assos = await getRow(res, Associations, { id: data.assos_id });
			condition.assos_id = data.assos_id;
		}

		if (data.jobs_id) {
			const job = await getRow(res, Jobs, { id: data.jobs_id });
			condition.jobs_id = data.jobs_id;
		}

		commonsController.create(null, res, Favorites, data, condition);
	},

	deleteFavorite: function (res, id) {
		commonsController.delete(res, Favorites, { id });
	},

	getUserJobs: async function (res, id, queries = null) {
		let condition = {};
		if (queries && queries.status) {
			let statusData = await getRow(res, Status, { label: queries.status });
			condition.status_id = statusData.id;
		}
		condition = Object.keys(condition).length === 0 ? null : condition;
		const excludeGroup = ["jobs_id"];

		commonsController.getAll(
			res,
			Groups,
			{ user_id: id },
			excludeGroup,
			includeUser
		);
	},

	getUserLitigations: async function (res, id, queries = null) {
		let condition = {};
		if (queries && queries.status) {
			let statusData = await getRow(res, Status, { label: queries.status });
			condition.status_id = statusData.id;
		}

    condition = Object.keys(condition).length === 0 ? null : condition;

    const includeLitigation = [
      {model: Status, as: "status", attributes: excludeCommon},
      {model: Litigation_objects, as: "litigation_object", attributes: excludeCommon},
      {
        model: Groups,
        as: "mission",
        attributes: { exclude: ["user_id","ads_id","status_id"] },
        include: [...includeUser],
        where: {user_id: id}
      }
    ];
    commonsController.getAll(res, Litigations, condition, ['litigation_object_id','group_id','status_id'], includeLitigation);
  }
};
