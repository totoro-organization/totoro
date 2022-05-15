const express = require("express");
const { passport } = require("utils/session");
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
} = require("./../../../models");
const {path} = require("utils/enum.json");
const {upload} = require("utils/storage");

exports.router = (function () {
	const commonsRouter = express.Router();

	// Roles
	commonsRouter.get("/roles", async function (req, res) {
		controller.getAll(res, Roles);
	});

	commonsRouter.get("/roles/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Roles, id);
	});

	commonsRouter.post("/roles", async function (req, res) {
		const data = req.body;
		const condition = { label: data.label };
		controller.create(null, res, Roles, data, condition);
	});

	commonsRouter.put("/roles/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const condition = { label: data.label };
		controller.update(res, Roles, id, data, condition);
	});

	commonsRouter.delete("/roles/:id", async function (req, res) {
		const id = req.params.id;
		controller.delete(res, Roles, {id});
	});

	// Pricings
	commonsRouter.get("/pricings", async function (req, res) {
		controller.getAll(res, Pricings);
	});

	commonsRouter.get("/pricings/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Pricings, id);
	});

	commonsRouter.post("/pricings", async function (req, res) {
		const data = req.body;
		const condition = { label: data.label };
		controller.create(null, res, Pricings, data, condition);
	});

	commonsRouter.put("/pricings/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const condition = { label: data.label };
		controller.update(res, Pricings, id, data, condition);
	});

	commonsRouter.delete("/pricings/:id", async function (req, res) {
		const id = req.params.id;
		controller.delete(res, Pricings, {id});
	});

	// Tags
	commonsRouter.get("/tags", async function (req, res) {
		controller.getAll(res, Tags);
	});

	commonsRouter.get("/tags/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Tags, id);
	});

	commonsRouter.post("/tags", async function (req, res) {
		const data = req.body;
		const condition = { label: data.label };
		controller.create(null, res, Tags, data, condition);
	});

	commonsRouter.put("/tags/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const condition = { label: data.label };
		controller.update(res, Tags, id, data, condition);
	});

	commonsRouter.delete("/tags/:id", async function (req, res) {
		const id = req.params.id;
		controller.delete(res, Tags, {id});
	});

	// Status
	commonsRouter.get("/status", async function (req, res) {
		controller.getAll(res, Status);
	});

	commonsRouter.get("/status/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Status, id);
	});

	commonsRouter.post("/status", async function (req, res) {
		const data = req.body;
		const condition = { label: data.label };
		controller.create(null, res, Status, data, condition);
	});

	commonsRouter.put("/status/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const condition = { label: data.label };
		controller.update(res, Status, id, data, condition);
	});

	commonsRouter.delete("/status/:id", async function (req, res) {
		const id = req.params.id;
		controller.delete(res, Status, {id});
	});

	// types-discounts
	commonsRouter.get("/types-discounts", async function (req, res) {
		controller.getAll(res, Types_discounts);
	});

	commonsRouter.get("/types-discounts/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Types_discounts, id);
	});

	commonsRouter.post("/types-discounts", async function (req, res) {
		const data = req.body;
		const condition = { name: data.name };
		controller.create(null, res, Types_discounts, data, condition);
	});

	commonsRouter.put("/types-discounts/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const condition = { name: data.name };
		controller.update(res, Types_discounts, id, data, condition);
	});

	commonsRouter.delete("/types-discounts/:id", async function (req, res) {
		const id = req.params.id;
		controller.delete(res, Types_discounts, {id});
	});

	// Litigation_objects
	commonsRouter.get("/litigation-objects", async function (req, res) {
		controller.getAll(res, Litigation_objects);
	});

	commonsRouter.get("/litigation-objects/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Litigation_objects, id);
	});

	commonsRouter.post("/litigation-objects", async function (req, res) {
		const data = req.body;
		const condition = { label: data.label };
		controller.create(null, res, Litigation_objects, data, condition);
	});

	commonsRouter.put("/litigation-objects/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const condition = { label: data.label };
		controller.update(res, Litigation_objects, id, data, condition);
	});

	commonsRouter.delete("/litigation-objects/:id", async function (req, res) {
		const id = req.params.id;
		controller.delete(res, Litigation_objects, {id});
	});

	// Difficulties
	commonsRouter.get("/difficulties", async function (req, res) {
		controller.getAll(res, Difficulties);
	});

	commonsRouter.get("/difficulties/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Difficulties, id);
	});

	commonsRouter.post("/difficulties", async function (req, res) {
		const data = req.body;
		const condition = { level: data.level };
		controller.create(null, res, Difficulties, data, condition);
	});

	commonsRouter.put("/difficulties/:id", async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		const condition = { level: data.level };
		controller.update(res, Difficulties, id, data, condition);
	});

	commonsRouter.delete("/difficulties/:id", async function (req, res) {
		const id = req.params.id;
		controller.delete(res, Difficulties, {id});
	});


	// Appearances
	commonsRouter.get("/appearances", async function (req, res) {
		controller.getAll(res, Appearances);
	});

	commonsRouter.get("/appearances/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Appearances, id);
	});

	commonsRouter.post("/appearances", upload(path.site).fields([{name: "icon", maxCount: 1}, {name: "logo", maxCount: 1}]), async function (req, res) {
		const data = req.body;
		if(req.files){
			data.files = req.files;
			data.path = path.site
		}
		const condition = { app_id: data.app_id };
		controller.create(null, res, Appearances, data, condition);
	});

	//single('name'), array('name', count), fields([{name: String, name: Int},])
	commonsRouter.put("/appearances/:id", upload(path.site).fields([{name: "icon", maxCount: 1}, {name: "logo", maxCount: 1}]), async function (req, res) {
		const id = req.params.id;
		const data = req.body;
		if(req.files) {
			data.files = req.files;
			data.path = path.site
		}
		controller.update(res, Appearances, id, data);
	});

	commonsRouter.delete("/appearances/:id", async function (req, res) {
		const id = req.params.id;
		controller.delete(res, Appearances, {id});
	});

	return commonsRouter;
})();
