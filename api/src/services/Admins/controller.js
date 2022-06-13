const bcrypt = require("bcryptjs");
const asyncLib = require("async");
const { Op } = require("sequelize");
const { generateToken } = require("utils/session");
const commonsController = require("../Commons/controller");
const { error, success } = require("utils/common/messages.json");
const { label_status } = require("utils/enum.json");
const { getRow, getField, updateField, getPaginationQueries } = require("utils/common/thenCatch");
const mailer = require("services/externals/mailer");
const {
  mail: { signup },
} = require("./../../../html");
const { from, subject, host } = require("utils/common/mail.json");
const { Status, Roles, Logs, Admins } = require("../../../models");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [
  { model: Status, as: "status", attributes: excludeCommon },
  { model: Roles, as: "role", attributes: excludeCommon },
];

const exclude = ["role_id", "status_id", "password"];

module.exports = {
	getAdmins: async function (res, queries) {
		let condition = {};
		const {status, role, size, page} = queries

		if(status){
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id=statusData.id
		}

		if(role){
			let roleData = await getRow(res, Roles, { label: role });
			condition.role_id=roleData.id
		}
		condition = Object.keys(condition).length === 0?null:condition

		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(res, Admins, condition, exclude, include, pagination);
	},
	getAdmin: function (res, id) {
		commonsController.getOne(res, Admins, id, exclude, include);
	},
	createAdmin: async function (res, data) {
		const {role_id, username, email} = data

		const statusData = await getRow(res, Status, { label: label_status.actived });
		const roleData = await getRow(res, Roles, { id: role_id });
		
		data["status_id"] = statusData.id;
		data["role_id"] = roleData.id;
		data["password"] = bcrypt.hashSync("123456", 10);

		const condition = { email, username };

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
					.json({ entity: Admins.name, message: success.create.message });
		},
		res, Admins, data, condition, null, true);
	},
	deleteAdmin: function (res, id) {
		commonsController.delete(res, Admins, { id });
	},
	updateAdmin: function (res, id, data) {
		const {email} = data
		const condition = {};
		if(email) condition.email = email;
		
		commonsController.update(res, Admins, id, data, condition);
	},
	getLogs: async function (res, queries) {
		const {start_date, end_date, status, role, size, page} = queries

		const condition = {};
		let includeCondition = {};

		if(start_date){
			condition.createdAt = { [Op.gte]: start_date }
		}
		if(end_date){
			condition.createdAt = { [Op.lte]: end_date }
		}

		if((end_date && start_date) && end_date < start_date)
			return res
					.status(error.parameters.status)
					.json({ entity: Logs.name,  message: "end date must be greater than start date" });
		

		if(status){
			let statusData = await getRow(res, Status, { label: status });
			includeCondition.status_id=statusData.id
		}

		if(role){
			let roleData = await getRow(res, Roles, { label: role });
			includeCondition.role_id=roleData.id
		}
		const includeAdmin = [{models: Admins, as: "admin", attributes: {exclude}, where:includeCondition, include}];

		let pagination = getPaginationQueries(size,page)

		commonsController.getAll(res, Logs, condition, ["admin_id"], includeAdmin, pagination);
	},
	getLog: function (res, adminId, queries) {
		const {start_date, end_date} = queries
		const condition = {admin_id: adminId};

		if(start_date){
			condition.createdAt = { [Op.gte]: start_date }
		}
		if(end_date){
			condition.createdAt = { [Op.lte]: end_date }
		}

		if((end_date && start_date) && end_date < start_date)
			return res
					.status(error.parameters.status)
					.json({ entity: Logs.name,  message: "end date must be greater than start date" });
		
		commonsController.getAll(res, Logs, condition);
	},
	createLog: function (res, data) {
		commonsController.create(null, res, Logs, data);
	},
	truncateLogs: function (res, queries) {
		const {start_date, end_date} = queries;
		const condition = {};

		if(start_date){
			condition.createdAt = { [Op.gte]: start_date }
		}
		if(end_date){
			condition.createdAt = { [Op.lte]: end_date }
		}

		if((end_date && start_date) && end_date < start_date)
			return res
					.status(error.parameters.status)
					.json({ entity: Logs.name, message: "end date must be greater than start date" });
		
		commonsController.delete(res, Logs, condition);
	},
	resetPassword: async function (res, data) {
		const {id,old_password,password} = data

		asyncLib.waterfall(
			[
				function (done) {
					const condition = {id};
					getField(res, Admins, condition, done, true, include);
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
						return res
							.status(error.access_forbidden.status)
							.json({ entity: Admins.name, message: error.access_forbidden.message });
					}
				},
				function (user, resByCrypt, done) {
					if (resByCrypt) {
						const updateData = {password: bcrypt.hashSync(password, 10)};
						updateField(res, user, updateData, done);
					}
					else {
						return res
							.status(error.access_forbidden.status)
							.json({ entity: Admins.name, message: error.access_forbidden.message });
					}
				},
			],
			function (updateFound) {
				if (updateFound)
					return res
						.status(success.update.status)
						.json({ entity: Admins.name, message: success.update.message });
				else
					return res
						.status(error.op_failed.status)
						.json({ entity: Admins.name, message: error.op_failed.message });
			}
		);
	},
	changeRole: async function (res, data) {
		const {role_id, admin_id} = data

		const roleData = await getRow(res, Roles, { id: role_id });
		commonsController.update(res, Admins, admin_id, {role_id: roleData.id});
	}
};
