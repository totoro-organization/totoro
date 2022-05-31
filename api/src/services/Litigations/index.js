const express = require("express");
const { passport, passportAdmin } = require("utils/session");
const controller = require("./controller");

exports.router = (function () {
  const litigationsRouter = express.Router();

  litigationsRouter.get("/", [passportAdmin, async function (req, res) {
    controller.getLitigations(res, req.query);
  }]);

  litigationsRouter.get("/:id", [passport, async function (req, res) {
    const id = req.params.id;
    controller.getLitigation(res, id);
  }]);

  litigationsRouter.post("/", [passport, async function (req, res) {
    const data = req.body;
    controller.createLitigation(res, data);
  }]);

  litigationsRouter.put("/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    controller.updateLitigation(res, id, data);
  }]);

  litigationsRouter.delete("/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.deleteLitigation(res, id);
  }]);

  return litigationsRouter;
})();
