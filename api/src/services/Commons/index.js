const express = require("express");
const { Op } = require("sequelize");
const { passport, passportAdmin } = require("~utils/session");
const controller = require("./controller");
const {
  Roles,
  Pricings,
  Tags,
  Status,
  Types_discounts,
  Difficulties,
  Appearances,
  Litigation_objects,
  Applications,
  Favorites
} = require("~orm/models");

const models = require("~orm/models");
const {
  getRow,
  getPaginationQueries
} = require("~utils/common/thenCatch");
const { path } = require("~utils/enum.json");
const { upload } = require("~utils/storage");
const { label_status } = require("~utils/enum.json");


const { params } = require("~utils/verify");
const { postCommon, putCommon, postDifficulty, putDifficulty, postLitigationObject, putLitigationObject, postPricing, putPricing, changeStatus } = require("./interface");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] }
const include = [
  { model: Status, as: "status", attributes: excludeCommon }
];
const exclude = ['status_id']

exports.router = (function () {
  const commonsRouter = express.Router();

  // Roles
  commonsRouter
  .get("/roles", async function (req, res) {
    const {status,type,page,size} = req.query
    let condition = {};
		if(status){
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id=statusData.id
		}
    if(type){
			condition.type= {[Op.like]: '%'+type+'%'}
		}

    let pagination = getPaginationQueries(size,page)

    controller.getAll(res, Roles, condition, exclude, include, pagination);
  })

  .get("/roles/:id", async function (req, res) {
    const id = req.params.id;
    controller.getOne(res, Roles, id, exclude, include);
  })

  .post("/roles", [passportAdmin, async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, postCommon);
    if(restrictions) return restrictions;

    const statusData = await getRow(res, Status, { label: label_status.actived });
    data.status_id = statusData.id
    const condition = { label: data.label };
    controller.create(null, res, Roles, data, condition);
  }])

  .put("/roles/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const restrictions = params(res, data, putCommon);
    if(restrictions) return restrictions;

    const condition = { label: data.label };
    controller.update(res, Roles, id, data, condition);
  }])

  .delete("/roles/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.delete(res, Roles, { id });
  }])

  // Pricings
  .get("/pricings", async function (req, res) {
    const {status,page,size} = req.query
    let condition = {};
		if(status){
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id=statusData.id
		}

    let pagination = getPaginationQueries(size,page)

    controller.getAll(res, Pricings, condition, exclude, include, pagination);
  })

  .get("/pricings/:id", async function (req, res) {
    const id = req.params.id;
    controller.getOne(res, Pricings, id, exclude, include);
  })

  .post("/pricings", [passportAdmin, async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, postPricing);
    if(restrictions) return restrictions;

    const statusData = await getRow(res, Status, { label: label_status.actived });
    data.status_id = statusData.id
    const condition = { label: data.label };
    controller.create(null, res, Pricings, data, condition);
  }])

  .put("/pricings/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const restrictions = params(res, data, putPricing);
    if(restrictions) return restrictions;

    const condition = { label: data.label };
    controller.update(res, Pricings, id, data, condition);
  }])

  .delete("/pricings/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.delete(res, Pricings, { id });
  }])

  // Tags
  .get("/tags", async function (req, res) {
    const {status,type,page,size} = req.query
    let condition = {};
		if(status){
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id=statusData.id
		}
    if(type){
			condition.type= {[Op.like]: '%'+type+'%'}
		}

    let pagination = getPaginationQueries(size,page)

    controller.getAll(res, Tags, condition, exclude, include, pagination);
  })

  .get("/tags/:id", async function (req, res) {
    const id = req.params.id;
    controller.getOne(res, Tags, id, exclude, include);
  })

  .post("/tags", [passportAdmin, async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, postCommon);
    if(restrictions) return restrictions;

    const statusData = await getRow(res, Status, { label: label_status.actived });
    data.status_id = statusData.id
    const condition = { label: data.label };
    controller.create(null, res, Tags, data, condition);
  }])

  .put("/tags/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const restrictions = params(res, data, putCommon);
    if(restrictions) return restrictions;

    const condition = { label: data.label };
    controller.update(res, Tags, id, data, condition);
  }])

  .delete("/tags/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.delete(res, Tags, { id });
  }])

  // Status
  .get("/status", async function (req, res) {
    const {page, size, type} = req.query
    let condition = {};
    if(type){
			condition.type= {[Op.like]: '%'+type+'%'}
		}
    let pagination = getPaginationQueries(size,page)

    controller.getAll(res, Status, condition, null, null, pagination);
  })

  .get("/status/:id", async function (req, res) {
    const id = req.params.id;
    controller.getOne(res, Status, id);
  })

  .post("/status", [passportAdmin, async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, postCommon);
    if(restrictions) return restrictions;

    const condition = { label: data.label };
    controller.create(null, res, Status, data, condition);
  }])

  .put("/status/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const restrictions = params(res, data, postCommon);
    if(restrictions) return restrictions;

    const condition = { label: data.label };
    controller.update(res, Status, id, data, condition);
  }])

  .put("/change/status", [passportAdmin, async function (req, res) {
    const id = req.body.id;
    const status_id = req.body.status_id
    const tableName = req.body.tableName;
    const restrictions = params(res, {status_id, tableName, id}, changeStatus);
    if(restrictions) return restrictions;

    const statusData = await getRow(res, Status, { id: status_id });

    controller.update(res, models[tableName], id, { status_id });
  }])

  // types-discounts
  .get("/types-discounts", async function (req, res) {
    const {status, page, size} = req.query
    let condition = {};
		if(status){
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id=statusData.id
		}

    let pagination = getPaginationQueries(size,page)

    controller.getAll(res, Types_discounts, condition, exclude, include, pagination);
  })

  .get("/types-discounts/:id", async function (req, res) {
    const id = req.params.id;
    controller.getOne(res, Types_discounts, id, exclude, include);
  })

  .post("/types-discounts", [passportAdmin, async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, postCommon);
    if(restrictions) return restrictions;

    const statusData = await getRow(res, Status, { label: label_status.actived });
    data.status_id = statusData.id
    const condition = { label: data.label };
    controller.create(null, res, Types_discounts, data, condition);
  }])

  .put("/types-discounts/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const restrictions = params(res, data, putCommon);
    if(restrictions) return restrictions;

    const condition = { label: data.label };
    controller.update(res, Types_discounts, id, data, condition);
  }])

  .delete("/types-discounts/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.delete(res, Types_discounts, { id });
  }])

  // Litigation_objects
  .get("/litigation-objects", async function (req, res) {
    const {status, page, size} = req.query
    let condition = {};
		if(status){
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id=statusData.id
		}

    let pagination = getPaginationQueries(size,page)

    controller.getAll(res, Litigation_objects, condition, exclude, include, pagination);
  })

  .get("/litigation-objects/:id", async function (req, res) {
    const id = req.params.id;
    controller.getOne(res, Litigation_objects, id, exclude, include);
  })

  .post("/litigation-objects", [passportAdmin, async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, postLitigationObject);
    if(restrictions) return restrictions;

    const statusData = await getRow(res, Status, { label: label_status.actived });
    data.status_id = statusData.id
    const condition = { label: data.label };
    controller.create(null, res, Litigation_objects, data, condition);
  }])

  .put("/litigation-objects/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const restrictions = params(res, data, putLitigationObject);
    if(restrictions) return restrictions;

    const condition = { label: data.label };
    controller.update(res, Litigation_objects, id, data, condition);
  }])

  .delete("/litigation-objects/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.delete(res, Litigation_objects, { id });
  }])

  // Difficulties
  .get("/difficulties", async function (req, res) {
    const {status,page,size} = req.query
    let condition = {};
		if(status){
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id=statusData.id
		}
    
    let pagination = getPaginationQueries(size,page)

    controller.getAll(res, Difficulties, Difficulties, exclude, include, pagination);
  })

  .get("/difficulties/:id", async function (req, res) {
    const id = req.params.id;
    controller.getOne(res, Difficulties, id, exclude, include);
  })

  .post("/difficulties", [passportAdmin, async function (req, res) {
    const data = req.body;
    const restrictions = params(res, data, postDifficulty);
    if(restrictions) return restrictions;

    const statusData = await getRow(res, Status, { label: label_status.actived });
    data.status_id = statusData.id
    const condition = { level: data.level };
    controller.create(null, res, Difficulties, data, condition);
  }])

  .put("/difficulties/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const restrictions = params(res, data, putDifficulty);
    if(restrictions) return restrictions;

    const condition = { level: data.level };
    controller.update(res, Difficulties, id, data, condition);
  }])

  .delete("/difficulties/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.delete(res, Difficulties, { id });
  }])

  // Appearances
  .get("/appearances", async function (req, res) {
    const {status,page,size} = req.query
    let condition = {};
		if(status){
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id=statusData.id
		}
    const includeAp = [...include, { model: Applications, as: "application", attributes: excludeCommon}]

    let pagination = getPaginationQueries(size,page)

    controller.getAll(res, Appearances, condition, ['status_id','app_id'], includeAp, pagination);
  })

  .get("/appearances/:id", async function (req, res) {
    const includeAp = [...include, { model: Applications, as: "application", attributes: excludeCommon}]
    const id = req.params.id;
    controller.getOne(res, Appearances, id, ['status_id','app_id'], includeAp);
  })

  .post(
    "/appearances",
    [passportAdmin, upload(path.site).fields([
      { name: "icon", maxCount: 1 },
      { name: "logo", maxCount: 1 },
    ]),
    async function (req, res) {
      const data = req.body;
      if (req.files) {
        data.files = req.files;
        data.path = path.site;
      }
      var app = await getRow(res, Applications, { label: data.app_id })
      const statusData = await getRow(res, Status, { label: label_status.actived });
      data.status_id = statusData.id
      const condition = { app_id: data.app_id };
      controller.create(null, res, Appearances, data, condition);
    }]
  )

  //single('name'), array('name', count), fields([{name: String, name: Int},])
  .put(
    "/appearances/:id",
    [passportAdmin, upload(path.site).fields([
      { name: "icon", maxCount: 1 },
      { name: "logo", maxCount: 1 },
    ]),
    async function (req, res) {
      const id = req.params.id;
      const data = req.body;

      if (req.files) {
        data.files = req.files;
        data.path = path.site;
      }

      controller.update(res, Appearances, id, data);
    }]
  )

  .delete("/appearances/:id", [passportAdmin, async function (req, res) {
    const id = req.params.id;
    controller.delete(res, Appearances, { id });
  }])

  .delete("/favorites/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.delete(res, Favorites, { id });
		},
	]);

  return commonsRouter;
})();
