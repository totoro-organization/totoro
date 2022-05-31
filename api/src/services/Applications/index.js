const express = require("express");
const { passport } = require("utils/session");
const controller = require("services/Commons/controller");
const { Applications } = require("./../../../models");
const { passportAdmin } = require("utils/session");

exports.router = (function () {
  const applicationsRouter = express.Router();

  applicationsRouter.get("/", [passportAdmin, async function (req, res) {
    controller.getAll(res, Applications);
  }]);

  applicationsRouter.get("/:id",[passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.getOne(res, Applications, id);
  }]);

  applicationsRouter.post("/", [passportAdmin, async function (req, res) {
    const data = req.body;
    const condition = { name: data.name };
    controller.create(null, res, Applications, data, condition);
  }]);

  applicationsRouter.put("/:id",[passportAdmin, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const condition = { name: data.name };
    controller.update(res, Applications, id, data, condition);
  }]);

  applicationsRouter.delete("/:id",[passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.delete(res, Applications, { id });
  }]);

  return applicationsRouter;
})();
