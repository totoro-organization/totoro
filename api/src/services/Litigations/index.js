const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");

const { params } = require("~utils/verify");
const { postLitigation, putLitigation } = require("./interface");

exports.router = (function () {
  const litigationsRouter = express.Router();

  litigationsRouter
  .get("/", [passportAdmin, async function (req, res) {
    controller.getLitigations(res, req.query);
  }])

  .get("/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.getLitigation(res, id);
  }])

  .post("/", [passport, async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, postLitigation);
		if(restrictions) return restrictions;

    controller.createLitigation(res, data);
  }])

  .put("/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const restrictions = params(res, data, putLitigation);
		if(restrictions) return restrictions;

    controller.updateLitigation(res, id, data);
  }])

  .delete("/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.deleteLitigation(res, id);
  }]);

  return litigationsRouter;
})();
