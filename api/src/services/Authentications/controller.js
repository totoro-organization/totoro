const asyncLib = require("async");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { generateToken } = require("utils/session");
const { getNearestTerminal } = require("utils/localisation");
const { getRow, getField } = require("utils/common/thenCatch");
const { error, success } = require("utils/common/messages.json");
const { Terminals, Status } = require("../../../models");
const mailer = require("services/externals/mailer");
const { from, subject, host } = require("utils/common/mail.json");
const commonsController = require("services/Commons/controller");
const {
  mail: { signup },
} = require("./../../../html");
const { sign } = require("jsonwebtoken");
const { label_status } = require("utils/enum.json");
const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [{ model: Status, as: "status", attributes: excludeCommon.exclude.push("type") }];
const exclude = ["status_id", "terminal_id"];

module.exports = {
  login: async function (res, model, data, isAdmin) {
    asyncLib.waterfall(
      [
        function (done) {
          const condition = {
            [Op.or]: [
              { email: data.emailOrUsername },
              { username: data.emailOrUsername },
            ],
          };
          getField(res, model, condition, done, true, include, exclude);
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
        delete user.dataValues.password;

        const token = generateToken(user, isAdmin);
        if (user.status.label === label_status.disabled) {
          if (
            !mailer.sendMail(
              host.gmail,
              from.email,
              from.password,
              user.email,
              subject.signup,
              signup(user, token)
            )
          ) {
            console.log("mail inexistant");
          }

          return res
            .status(success.user_inactive.status)
            .json({ message: success.user_inactive.message });
        } else {
          return res.status(success.create.status).json({ token });
        }
      }
    );
  },

  signup: async function (res, model, data) {
    const inactiveStatus = await getRow(res, Status, {
      label: label_status.disabled,
    });
    /*
		const activeStatus = await getRow(res, Status, { label: label_status.actived });
		const terminalsRequest = await getRows(Terminals);
		const terminals = terminalsRequest.filter(
			(terminal) => terminal.status_id === activeStatus.id
		);
		const nearestTerminal = getNearestTerminal(terminals, {
			longitude: data["longitude"],
			latitude: data["latitude"],
		});
		*/
    data["status_id"] = inactiveStatus.id;
    data["total_token"] = 0;
    data["password"] = bcrypt.hashSync(data["password"], 10);
    data["avatar"] = "/avatar/avatar.svg";
    //data["terminal_id"] = nearestTerminal.id;

    const condition = { email: data.email, username: data.username };

    commonsController.create(
      function (result) {
        delete result.dataValues.password;

        const token = generateToken(result);
        if (
          !mailer.sendMail(
            host.gmail,
            from.email,
            from.password,
            result.email,
            subject.signup,
            signup(result, token)
          )
        ) {
          console.log("mail inexistant");
        }

        return res
          .status(success.create.status)
          .json({ message: success.create.message });
      },
      res,
      model,
      data,
      condition,
      null,
      true
    );
  },

  forgot: async function (res, model, data) {
    const activeStatus = await getRow(Status, { label: label_status.actived });

    asyncLib.waterfall(
      [
        function (done) {
          const condition = { email: data.email, status_id: activeStatus.id };
          exclude.push("password");
          getField(res, model, condition, done, false, include, exclude);
        },
      ],
      function (found) {
        if (found) {
          const token = generateToken(found);
          if (
            !mailer.sendMail(
              host.gmail,
              from.email,
              from.password,
              found.email,
              subject.signup,
              signup(found, token)
            )
          ) {
            console.log("mail inexistant");
          }

          return res
            .status(success.get.status)
            .json({ message: success.get.message });
        } else {
          return res
            .status(error.not_found.status)
            .json({ message: error.not_found.message });
        }
      }
    );
  },
};
