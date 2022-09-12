const express = require("express");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("~services/Commons/controller");
const { Applications, Status } = require("~orm/models");
const {
  getRow,
  getPaginationQueries
} = require("~utils/common/thenCatch");

const { params } = require("~utils/verify");
const {postApplication, putApplication} = require("./interface");


const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] }
const include = [
  { model: Status, as: "status", attributes: excludeCommon }
];
const exclude = ['status_id']

exports.router = (function () {
  const applicationsRouter = express.Router();

  applicationsRouter
  .get("/", async function (req, res) {
    const {status,page,size} = req.query
    let condition = {};
		if(status){
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id=statusData.id
		}

    let pagination = getPaginationQueries(size,page)

    controller.getAll(res, Applications, condition, exclude, include, pagination);
  })

  .get("/:id", async function (req, res) {
    const id = req.params.id;
    controller.getOne(res, Applications, id);
  })

  .post("/", [passportAdmin, async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, postApplication);
    if(restrictions) return restrictions;

    const condition = { name: data.name };
    controller.create(null, res, Applications, data, condition);
  }])

  .put("/:id",[passportAdmin, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const restrictions = params(res, data, putApplication);
    if(restrictions) return restrictions;

    const condition = { name: data.name };
    controller.update(res, Applications, id, data, condition);
  }])

  .delete("/:id",[passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.delete(res, Applications, { id });
  }]);

  return applicationsRouter;
})();
