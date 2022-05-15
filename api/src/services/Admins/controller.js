const models = require("./../../../models");
const bcrypt = require("bcryptjs");
const asyncLib = require("async");
const { Op } = require("sequelize");
const { generateToken } = require("utils/session");
const commonsController = require("../Commons/controller");
const { error, success } = require("utils/common/messages.json");
const { status } = require("utils/enum.json");
const { getRow, getField, updateField} = require("utils/common/thenCatch");
const mailer = require("services/externals/mailer");
const {
	mail: { signup },
} = require("./../../../html");
const { from, subject, host } = require("utils/common/mail.json");
const { Status, Roles, Logs, Admins } = require("../../../models");

const include = [{model: Status, as: "status"}, {model: Roles, as: "role"}, {model: Logs, as: "logs", attributes: {exclude:['admin_id']}}];
const exclude = ["role_id", "status_id", "password"];

module.exports = {
	getAdmins: async function (res, queries = null) {
		let condition = {};
		if(queries && queries.status){
			let statusData = await getRow(res, Status, { label: queries.status });
			condition.status_id=statusData.id
		}

		if(queries && queries.role){
			let roleData = await getRow(res, Roles, { label: queries.role });
			condition.role_id=roleData.id
		}
		condition = Object.keys(condition).length === 0?null:condition

		commonsController.getAll(res, Admins, condition, exclude, include);
	},
	getAdmin: function (res, id) {
		commonsController.getOne(res, Admins, id, exclude, include);
	},
	createAdmin: async function (res, data) {
		const statusData = await getRow(res, Status, { label: status.actived });
		
		data["status_id"] = statusData.id;
		data["password"] = bcrypt.hashSync("123456", 10);

		const condition = { email: data.email, username: data.username };

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
					.json({ message: success.create.message });
		},
		res, Admins, data, condition, null, true);
	},
	deleteAdmin: function (res, id) {
		commonsController.delete(res, Admins, { id });
	},
	updateAdmin: function (res, id, data) {
		const condition = {};
		if(data.email) condition.email = data.email;
		if(data.username) condition.username = data.username;
		
		commonsController.update(res, Admins, id, data, condition);
	},
	getLogs: async function (res, queries = null) {
		let condition = {};
		if(queries && queries.status){
			let statusData = await getRow(res, Status, { label: queries.status });
			condition.status_id=statusData.id
		}

		if(queries && queries.role){
			let roleData = await getRow(res, Roles, { label: queries.role });
			condition.role_id=roleData.id
		}
		const includeAdmin = [{models: Admins, as: "admin", attributes: {exclude}, where:condition, include}];
		commonsController.getAll(res, Logs, null, null, includeAdmin);
	},
	getLog: function (res, adminId) {
		const condition = {admin_id: adminId};
		commonsController.getAll(res, Logs, condition);
	},
	createLog: function (res, data) {
		commonsController.create(null, res, Logs, data);
	},
	truncateLogs: function (res, queries) {
		let start_date = null;
		let end_date = null;
		const condition = {};

		if(queries.start_date){
			condition.createdAt = { [Op.gte]: start_date }
		}
		if(queries.end_date){
			condition.createdAt = { [Op.lte]: end_date }
		}

		if((end_date && start_date) && end_date < start_date)
			return res
					.status(error.parameters.status)
					.json({ message: "end date must be greater than start date" });
		
		commonsController.delete(res, Logs, condition);
	},
	resetPassword: async function (res, data) {
		asyncLib.waterfall(
			[
				function (done) {
					const condition = {id: data.id};
					getField(res, Admins, condition, done, true, include);
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
						return res
							.status(error.access_forbidden.status)
							.json({ message: error.access_forbidden.message });
					}
				},
				function (user, resByCrypt, done) {
					if (resByCrypt) {
						const updateData = {password: data.password};
						updateField(res, user, updateData, done);
					}
					else {
						return res
							.status(error.access_forbidden.status)
							.json({ message: error.access_forbidden.message });
					}
				},
			],
			function (updateFound) {
				if (updateFound)
					return res
						.status(success.update.status)
						.json({ message: success.update.message });
				else
					return res
						.status(error.op_failed.status)
						.json({ message: error.op_failed.message });
			}
		);
	},
	changeRole: async function (res, data) {
		commonsController.update(res, Admins, data.admin_id, {role_id: data.role_id});
	},
};
