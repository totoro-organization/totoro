const asyncLib = require("async");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { generateToken } = require("utils/session");
const { getNearestTerminal } = require("utils/localisation");
const { getRow, getRows } = require("utils/common/thenCatch");
const { error, success } = require("utils/common/messages.json");
const { Terminals, Status } = require("../../../models");
const mailer = require("services/externals/mailer");
const { from, subject, host } = require("utils/common/mail.json");
const commonsController = require("services/Commons/controller");
const {
	mail: { signup },
} = require("./../../../html");
const { sign } = require("jsonwebtoken");

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
					model
						.findOne({
							where: condition,
							include: [
								{
									model: Status,
								},
							],
						})
						.then((user) => done(null, user))
						.catch((err) => {
							return res
								.status(error.syntax_error.status)
								.json({ message: error.syntax_error.message });
						});
				},
				function (user, done) {
					if (user) {
						bcrypt.compare(
							data.password,
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
					if (resByCrypt) done(user);
					else {
						return res
							.status(error.access_forbidden.status)
							.json({ message: error.access_forbidden.message });
					}
				},
			],
			function (user) {
				const token = generateToken(user);
				if (user.Status.label === "inactive") {
					mailer.sendMail(
						host.gmail,
						from.email,
						from.password,
						user.email,
						subject.signup,
						signup(user, token)
					);
					return res
						.status(success.user_inactive.status)
						.json({ message: success.user_inactive.message });
				} else {
					delete user.dataValues.password;
					return res.status(success.create.status).json({ token });
				}
			}
		);
	},
	signup: async function (res, model, data) {
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

		const condition = { email: data.email, username: data.username };

		const create = commonsController.create(res, model, data, condition, null, true);

		console.log(create);
		if(typeof create == "string"){
			const token = generateToken(create);
			mailer.sendMail(
				host.gmail,
				from.email,
				from.password,
				create.email,
				subject.signup,
				signup(create, token)
			);

			return res
				.status(success.create.status)
				.json({ message: success.create.message });
		} else {
			return create;
		}

	},
	forgot: function (res, data) {},
	resetPassword: function (res, data) {},
};
