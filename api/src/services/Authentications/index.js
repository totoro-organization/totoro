const express = require("express");
const { passport } = require("~utils/session");
const usersController = require("~services/Users/controller");
const adminsController = require("~services/Admins/controller");
const controller = require("./controller");

const { Users, Admins } = require("~orm/models");

const { params } = require("~utils/verify");
const {loginUser, forgot, signup} = require("./interface");

exports.router = (function () {
  const authRouter = express.Router();

  authRouter
  .post("/login", async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, loginUser);
    if(restrictions) return restrictions;

    data.app = req.app;
    controller.login(res, Users, data, false);
  })

  .post("/login/admin", async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, loginUser);
    if(restrictions) return restrictions;

    data.app = req.app;
    controller.login(res, Admins, data, true);
  })

  .post("/signup", async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, signup);
    if(restrictions) return restrictions;

    data.app = req.app;
    controller.signup(res, Users, data);
  })

  .post("/forgot", async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, forgot);
    if(restrictions) return restrictions;

    data.app = req.app;
    controller.forgot(res, Users, data);
  })

  .get("/connected", [
    passport,
    async function (req, res) {
      if (req.userData.isAdmin) adminsController.getAdmin(res, req.userData.id);
      else usersController.getUser(res, req.userData.id);
    },
  ]);

  return authRouter;
})();
