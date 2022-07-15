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
	Favorites,
} = require("~orm/models");

const models = require("~orm/models");
const { getRow, getPaginationQueries } = require("~utils/common/thenCatch");
const { path } = require("~utils/enum.json");
const { upload } = require("~utils/storage");
const { label_status } = require("~utils/enum.json");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };
const include = [{ model: Status, as: "status", attributes: excludeCommon }];
const exclude = ["status_id"];

exports.router = (function () {
	const commonsRouter = express.Router();

	// Roles
	commonsRouter.get("/roles", async function (req, res) {
		const { status, type, page, size } = req.query;
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}
		if (type) {
			condition.type = { [Op.like]: "%" + type + "%" };
		}

		let pagination = getPaginationQueries(size, page);

		controller.getAll(res, Roles, condition, exclude, include, pagination);
	});

	commonsRouter.get("/roles/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Roles, id, exclude, include);
	});

	commonsRouter.post("/roles", [
		passportAdmin,
		async function (req, res) {
			const data = req.body;
			const statusData = await getRow(res, Status, {
				label: label_status.actived,
			});
			data.status_id = statusData.id;
			const condition = { label: data.label };
			controller.create(null, res, Roles, data, condition);
		},
	]);

	commonsRouter.put("/roles/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			const condition = { label: data.label };
			controller.update(res, Roles, id, data, condition);
		},
	]);

	commonsRouter.delete("/roles/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.delete(res, Roles, { id });
		},
	]);

	// Pricings
	commonsRouter.get("/pricings", async function (req, res) {
		const { status, page, size } = req.query;
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		let pagination = getPaginationQueries(size, page);

		controller.getAll(res, Pricings, condition, exclude, include, pagination);
	});

	commonsRouter.get("/pricings/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Pricings, id, exclude, include);
	});

	commonsRouter.post("/pricings", [
		passportAdmin,
		async function (req, res) {
			const data = req.body;
			const statusData = await getRow(res, Status, {
				label: label_status.actived,
			});
			data.status_id = statusData.id;
			const condition = { label: data.label };
			controller.create(null, res, Pricings, data, condition);
		},
	]);

	commonsRouter.put("/pricings/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			const condition = { label: data.label };
			controller.update(res, Pricings, id, data, condition);
		},
	]);

	commonsRouter.delete("/pricings/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.delete(res, Pricings, { id });
		},
	]);

	// Tags
	commonsRouter.get("/tags", async function (req, res) {
		const { status, type, page, size } = req.query;
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}
		if (type) {
			condition.type = { [Op.like]: "%" + type + "%" };
		}

		let pagination = getPaginationQueries(size, page);

		controller.getAll(res, Tags, condition, exclude, include, pagination);
	});

	commonsRouter.get("/tags/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Tags, id, exclude, include);
	});

	commonsRouter.post("/tags", [
		passportAdmin,
		async function (req, res) {
			const data = req.body;
			const statusData = await getRow(res, Status, {
				label: label_status.actived,
			});
			data.status_id = statusData.id;
			const condition = { label: data.label };
			controller.create(null, res, Tags, data, condition);
		},
	]);

	commonsRouter.put("/tags/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			const condition = { label: data.label };
			controller.update(res, Tags, id, data, condition);
		},
	]);

	commonsRouter.delete("/tags/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.delete(res, Tags, { id });
		},
	]);

	// Status
	commonsRouter.get("/status", async function (req, res) {
		const { page, size, type } = req.query;
		let condition = {};
		if (type) {
			condition.type = { [Op.like]: "%" + type + "%" };
		}
		let pagination = getPaginationQueries(size, page);

		controller.getAll(res, Status, condition, null, null, pagination);
	});

	commonsRouter.get("/status/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Status, id);
	});

	commonsRouter.post("/status", [
		passportAdmin,
		async function (req, res) {
			const data = req.body;
			const condition = { label: data.label };
			controller.create(null, res, Status, data, condition);
		},
	]);

	commonsRouter.put("/status/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			const condition = { label: data.label };
			controller.update(res, Status, id, data, condition);
		},
	]);

	commonsRouter.put("/change/status", [
		passportAdmin,
		async function (req, res) {
			const id = req.body.id;
			const status_id = req.body.status_id;
			const tableName = req.body.tableName;
			const statusData = await getRow(res, Status, { id: status_id });

			controller.update(res, models[tableName], id, { status_id });
		},
	]);

	// types-discounts
	commonsRouter.get("/types-discounts", async function (req, res) {
		const { status, page, size } = req.query;
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		let pagination = getPaginationQueries(size, page);

		controller.getAll(
			res,
			Types_discounts,
			condition,
			exclude,
			include,
			pagination
		);
	});

	commonsRouter.get("/types-discounts/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Types_discounts, id, exclude, include);
	});

	commonsRouter.post("/types-discounts", [
		passportAdmin,
		async function (req, res) {
			const data = req.body;
			const statusData = await getRow(res, Status, {
				label: label_status.actived,
			});
			data.status_id = statusData.id;
			const condition = { label: data.label };
			controller.create(null, res, Types_discounts, data, condition);
		},
	]);

	commonsRouter.put("/types-discounts/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			const condition = { label: data.label };
			controller.update(res, Types_discounts, id, data, condition);
		},
	]);

	commonsRouter.delete("/types-discounts/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.delete(res, Types_discounts, { id });
		},
	]);

	// Litigation_objects
	commonsRouter.get("/litigation-objects", async function (req, res) {
		const { status, page, size } = req.query;
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		let pagination = getPaginationQueries(size, page);

		controller.getAll(
			res,
			Litigation_objects,
			condition,
			exclude,
			include,
			pagination
		);
	});

	commonsRouter.get("/litigation-objects/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Litigation_objects, id, exclude, include);
	});

	commonsRouter.post("/litigation-objects", [
		passportAdmin,
		async function (req, res) {
			const data = req.body;
			const statusData = await getRow(res, Status, {
				label: label_status.actived,
			});
			data.status_id = statusData.id;
			const condition = { label: data.label };
			controller.create(null, res, Litigation_objects, data, condition);
		},
	]);

	commonsRouter.put("/litigation-objects/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			const condition = { label: data.label };
			controller.update(res, Litigation_objects, id, data, condition);
		},
	]);

	commonsRouter.delete("/litigation-objects/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.delete(res, Litigation_objects, { id });
		},
	]);

	// Difficulties
	commonsRouter.get("/difficulties", async function (req, res) {
		const { status, page, size } = req.query;
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}

		let pagination = getPaginationQueries(size, page);

		controller.getAll(
			res,
			Difficulties,
			Difficulties,
			exclude,
			include,
			pagination
		);
	});

	commonsRouter.get("/difficulties/:id", async function (req, res) {
		const id = req.params.id;
		controller.getOne(res, Difficulties, id, exclude, include);
	});

	commonsRouter.post("/difficulties", [
		passportAdmin,
		async function (req, res) {
			const data = req.body;
			const statusData = await getRow(res, Status, {
				label: label_status.actived,
			});
			data.status_id = statusData.id;
			const condition = { level: data.level };
			controller.create(null, res, Difficulties, data, condition);
		},
	]);

	commonsRouter.put("/difficulties/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			const data = req.body;
			const condition = { level: data.level };
			controller.update(res, Difficulties, id, data, condition);
		},
	]);

	commonsRouter.delete("/difficulties/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.delete(res, Difficulties, { id });
		},
	]);

	// Appearances
	commonsRouter.get("/appearances", async function (req, res) {
		const { status, page, size } = req.query;
		let condition = {};
		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}
		const includeAp = [
			...include,
			{ model: Applications, as: "application", attributes: excludeCommon },
		];

		let pagination = getPaginationQueries(size, page);

		controller.getAll(
			res,
			Appearances,
			condition,
			["status_id", "app_id"],
			includeAp,
			pagination
		);
	});

	commonsRouter.get("/appearances/:id", async function (req, res) {
		const includeAp = [
			...include,
			{ model: Applications, as: "application", attributes: excludeCommon },
		];
		const id = req.params.id;
		controller.getOne(res, Appearances, id, ["status_id", "app_id"], includeAp);
	});

	commonsRouter.post("/appearances", [
		passportAdmin,
		upload(path.site).fields([
			{ name: "icon", maxCount: 1 },
			{ name: "logo", maxCount: 1 },
		]),
		async function (req, res) {
			const data = req.body;
			if (req.files) {
				data.files = req.files;
				data.path = path.site;
			}
			var app = await getRow(res, Applications, { label: data.app_id });
			const statusData = await getRow(res, Status, {
				label: label_status.actived,
			});
			data.status_id = statusData.id;
			const condition = { app_id: data.app_id };
			controller.create(null, res, Appearances, data, condition);
		},
	]);

	//single('name'), array('name', count), fields([{name: String, name: Int},])
	commonsRouter.put("/appearances/:id", [
		passportAdmin,
		upload(path.site).fields([
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
		},
	]);

	commonsRouter.delete("/appearances/:id", [
		passportAdmin,
		async function (req, res) {
			const id = req.params.id;
			controller.delete(res, Appearances, { id });
		},
	]);

	commonsRouter.delete("/favorites/:id", [
		passport,
		async function (req, res) {
			const id = req.params.id;
			controller.delete(res, Favorites, { id });
		},
	]);

	return commonsRouter;
})();
