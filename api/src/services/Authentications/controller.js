const asyncLib = require("async");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { generateToken } = require("~utils/session");
//const { getNearestTerminal } = require("~utils/localisation");
const { getRow, getField } = require("~utils/common/thenCatch");
const { error, success } = require("~utils/common/messages.json");
const { Terminals, Status } = require("~orm/models");
//Send mail
const { signup, verify, forgot } = require("~utils/common/mail.json");
const { sendMail } = require("~externals/mailer");
const commonsController = require("~services/Commons/controller");
const { label_status, provider } = require("~utils/enum.json");
const { isEmailValid } = require("~utils/verify");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [{ model: Status, as: "status", attributes: excludeCommon }];
const exclude = ["status_id", "terminal_id"];

module.exports = {
  login: async function (res, model, data, isAdmin) {
    const {emailOrUsername, password, app} = data

    asyncLib.waterfall(
      [
        function (done) {
          const condition = {
            [Op.or]: [
              { email: emailOrUsername },
              { username: emailOrUsername },
            ],
          };
          getField(res, model, condition, done, true, include, exclude);
        },

        function (user, done) {
          if (user) {
            bcrypt.compare(
              password,
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
        if (user.status.label !== label_status.actived) {
          //Send mail
          if(user.status.label === label_status.disabled) sendMail(verify.template, {to: user.email, subject: verify.subject}, {firstname: user.firstname, lastname: user.lastname, provider: provider[app.name], token: encodeURIComponent(token)})

          return res
            .status(error.user_inactive.status)
            .json({ message: error.user_inactive.message });
        } else {
          return res.status(success.create.status).json({ token });
        }
      }
    );
  },

  signup: async function (res, model, data) {
    const {password,email,username, app} = data
    /*
    const emailValid = await isEmailValid(email);
    if(emailValid !== "ok")
      return res
        .status(error.parameters.status)
        .json({ message: emailValid });
    */

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
    data["password"] = bcrypt.hashSync(password, 10);
    //data["terminal_id"] = nearestTerminal.id;

    const condition = {[Op.or]: [{ email },{ username }],};

    commonsController.create(
      function (result) {
        delete result.dataValues.password;

        const token = generateToken(result);
        //Send mail
        sendMail(signup.template, {to: email, subject: signup.subject}, {firstname: result.firstname, lastname: result.lastname, provider: provider[app.name], token: encodeURIComponent(token)})

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
    const {email, app} = data

    /*
    const emailValid = await isEmailValid(email);
    if(emailValid !== "ok")
      return res
        .status(error.parameters.status)
        .json({ message: emailValid });
    */

    const activeStatus = await getRow(res, Status, { label: label_status.actived });

    asyncLib.waterfall(
      [
        function (done) {
          const condition = { email, status_id: activeStatus.id };
          exclude.push("password");
          getField(res, model, condition, done, false, include, exclude);
        },
      ],
      function (found) {
        if (found) {
          const token = generateToken(found);
          //Send mail
          sendMail(forgot.template, {to: email, subject: forgot.subject}, {firstname: found.firstname, lastname: found.lastname, provider: provider[app.name], token: encodeURIComponent(token)})

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
