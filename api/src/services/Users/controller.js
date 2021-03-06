const bcrypt = require("bcryptjs");
const asyncLib = require("async");
const { error, success } = require("~utils/common/messages.json");
const { isEmailValid } = require("~utils/verify");

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
	Partners,
	Tokens,
	Types_discounts,
	Discounts
} = require("~orm/models");
const commonsController = require("~services/Commons/controller");

const { getRow, getField, updateField, getPaginationQueries } = require("~utils/common/thenCatch");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [
	{ model: Status, as: "status", attributes: excludeCommon },
	{
		model: Associations_users,
		as: "memberships",
		attributes: {
			exclude: ["user_id", "assos_id", "role_id", "status_id"],
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
	{
		model: Partners,
		as: "partners",
		attributes: {exclude: ["status_id"]},
		include: [{ model: Status, as: "status", attributes: excludeCommon }],
	}
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
					exclude: ["user_id", "assos_id", "role_id", "status_id","createdAt","updatedAt"],
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
			}
		],
	},
	{ model: Status, as: "status", attributes: excludeCommon },
];

module.exports = {
	getUsers: async function (res, queries) {
		const {size,page,status, order} = queries
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		condition = Object.keys(condition).length === 0 ? null : condition;

		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(res, Users, condition, exclude, include, pagination, order);
	},

	getUser: function (res, id) {
		commonsController.getOne(res, Users, id, exclude, include);
	},

	updateUser: async function (res, id, data) {
		const {email} = data
		const condition = {};
		if (email) {
			/*
			const emailValid = await isEmailValid(email);
			if(emailValid !== "ok")
				return res
					.status(error.parameters.status)
					.json({ message: emailValid });
			*/
			condition.email = email
		};
		commonsController.update(res, Users, id, data, condition);
	},

	updateAvatar: function (res, id, data) {
		commonsController.update(res, Users, id, data);
	},

	deleteUser: function (res, id) {
		commonsController.delete(res, Users, { id });
	},

	resetPassword: async function (res, id, data) {
		data.password =  bcrypt.hashSync(data.password, 10);
		commonsController.update(res, Users, id, data);
	},

	changePassword: async function (res, data) {
		const {id, old_password, password} = data
		asyncLib.waterfall(
			[
				function (done) {
					const condition = { id };
					getField(res, Users, condition, done, true, include);
				},
				function (user, done) {
					if (user) {
						bcrypt.compare(
							old_password,
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
						const updateData = {password: bcrypt.hashSync(password, 10)};
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
	getFavorites: async function (res, id, queries) {
		const {status, size, page, order} = queries
		let condition = {};

		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}
		condition = Object.keys(condition).length === 0 ? null : condition;

		const includeFavorites = [...includeUser];
		for (let i = 0; i < includeFavorites.length; i++) {
			const item = includeFavorites[i];
			if(item.as == "status") item.where = condition
		}

		includeFavorites.splice(-1);
		includeFavorites.push({
			model: Associations,
			as: "organization",
			attributes: { exclude: ["status_id"] },
			include: [{ model: Status, as: "status", attributes: excludeCommon }],
		});

		let pagination = getPaginationQueries(size,page)
		commonsController.getAll(
			res,
			Favorites,
			{ user_id: id },
			["assos_id", "jobs_id", "status_id"],
			includeFavorites,
			pagination, 
			order
		);
	},

	createFavorite: async function (res, data) {
		const condition = {};
		const {assos_id,jobs_id,} = data
		if ((!assos_id && !jobs_id) || (assos_id && jobs_id))
			return res
				.status(error.parameters.status)
				.json({ message: "send assos_id or jobs_id in data" });

		if (assos_id) {
			const assos = await getRow(res, Associations, { id: assos_id });
			condition.assos_id = assos_id;
		}

		if (jobs_id) {
			const job = await getRow(res, Jobs, { id: jobs_id });
			condition.jobs_id = jobs_id;
		}

		commonsController.create(null, res, Favorites, data, condition);
	},

	getUserJobs: async function (res, id, queries) {
		const {status, size, page, order} = queries

		let condition = {user_id: id};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}
		const excludeGroup = ["jobs_id"];
		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(
			res,
			Groups,
			condition,
			excludeGroup,
			includeUser,
			pagination,
			order
		);
	},

	getUserJobsPublished: async function (res, id, queries) {
		const {status, size, page, order} = queries
		let statusData = await getRow(res, Status, { label: status });

		let condition = {assos_user_id: id};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		const includeJobs = [
			{ model: Status, as: "status", attributes: excludeCommon },
			{ model: Difficulties, as: "difficulty", attributes: excludeCommon }
		];

		const excludeJobs = ["status_id", "difficulty_id"];
		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(
			res,
			Jobs,
			condition,
			excludeJobs,
			includeJobs,
			pagination,
			order
		);
	},

	getUserLitigations: async function (res, id, queries) {
		const {status, size, page, order} = queries

		let condition = {type: true};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}


		const includeLitigation = [
		{model: Status, as: "status", attributes: excludeCommon},
		{model: Litigation_objects, as: "litigation_object", attributes: excludeCommon},
		{
			model: Groups,
			as: "mission",
			required: true,
			attributes: { exclude: ["user_id","jobs_id","status_id"] },
			include: [...includeUser],
			where: {user_id: id}
		}
		];
		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(res, Litigations, condition, ['litigation_object_id','group_id','status_id'], includeLitigation, pagination, order);
  	},

	getTransactions: async function (res, id, queries) {
		const {size, page, status, order} = queries
		let condition = {user_id : id};

		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		const excludeTransactions = ["discount_id", "status_id"];
		const includeTransactions = [
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
			{ model: Status, as: "status", attributes: excludeCommon },
		]
		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(res, Tokens, condition, excludeTransactions, includeTransactions, pagination, order);
	}
};
