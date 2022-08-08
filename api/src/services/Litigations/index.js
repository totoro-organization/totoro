const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");

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
    controller.createLitigation(res, data);
  }])

  .put("/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    controller.updateLitigation(res, id, data);
  }])

  .delete("/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.deleteLitigation(res, id);
  }]);

  return litigationsRouter;
})();
