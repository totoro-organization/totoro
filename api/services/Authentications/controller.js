const models = require("../../models");
const asyncLib = require("async");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { getNearestTerminal } = require("../../utils/localisation");
const { getRow, getRows } = require("../../utils/Commons/thenCatch");
const { error, success } = require("../../utils/Commons/messages.json");
const { Terminals, Status } = require("../../models");

module.exports = {
	login: function (res, model, data) {
		asyncLib.waterfall(
			[
				function (done) {
					const condition = {
						[Op.or]: [
							{ email: data.emailOrUsername },
							{ username: data.emailOrUsername },
						],
					};
					model.findOne({
						where: condition,
						include: [
							{
								model: Status,
							},
						],
					});
				},
				function (result, done) {
					if (result) {
					} else {
						res
							.status(error.access_forbidden.status)
							.json({ message: error.access_forbidden.message });
					}
				},
			],
			function (newField) {
				if (newField)
					res
						.status(success.create.status)
						.json({ message: success.create.message });
				else
					res
						.status(error.op_failed.status)
						.json({ message: error.op_failed.message });
			}
		);
	},
	signup: async function (data) {
		const inactiveStatus = await getRow(Status, { label: "inactive" });
		const activeStatus = await getRow(Status, { label: "active" });
		const terminalsRequest = await getRows(Terminals);
		const terminals = terminalsRequest.filter(
			(terminal) => terminal.status_id === activeStatus.id
		);
		const nearestTerminal = getNearestTerminal(terminals, {
			longitude: data["longitude"],
			latitude: data["latitude"],
		});
		data["status_id"] = inactiveStatus.id;
		data["password"] = bcrypt.hashSync(data["password"], 10);
		data["avatar"] = "/img/avatar/avatar.svg";
		data["terminal_id"] = nearestTerminal.id;

		return data;
	},
	forgot: function (res, data) {},
	resetPassword: function (res, data) {},
};

/* 
    - id
    - firstname
    - lastname
    - username
    - email
    - password
    - birthday
    - address
    - cp

    - longitude
    - latitude


    - avatar
    - terminal_id
    - status_id

    
    - bio
    - rating
    - phone

*/
