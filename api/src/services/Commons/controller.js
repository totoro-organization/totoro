const asyncLib = require("async");
const { Op } = require("sequelize");
const { error, success } = require("utils/common/messages.json");
const {
	responseAll,
	responseOne,
	actionDelete,
	getField,
	createField,
	updateField,
} = require("utils/common/thenCatch");

module.exports = {
	getAll: function (res, model, condition = null, include = null) {
		responseAll(model, res, condition, include);
	},
	getOne: function (res, model, id, include = null) {
		responseOne(model, res, id, include);
	},
	create: function (res, model, data, condition, include = null, response = false) {
		asyncLib.waterfall(
			[
				function (done) {
					getField(res, model, condition, done, true, include);
				},
				function (result, done) {
					if (result)
						res
							.status(error.duplicate.status)
							.json({ message: error.duplicate.message });
					else {
						createField(res, model, data, done);
					}
				},
			],
			function (newField) {
				if (newField)
					if(response){
						return newField;
					} else {
						return res
						.status(success.create.status)
						.json({ message: success.create.message });
					}

				else
					return res
						.status(error.op_failed.status)
						.json({ message: error.op_failed.message });
			}
		);
	},
	update: function (res, model, id, data, condition) {
		asyncLib.waterfall(
			[
				function (done) {
					getField(res, model, { id }, done, true);
				},
				function (found, done) {
					if (!found)
						return res
							.status(error.not_found.status)
							.json({ message: error.not_found.message });
					else
						getField(
							res,
							model,
							{ ...condition, id: { [Op.ne]: id } },
							done,
							true
						);
				},
				function (found, done) {
					if (found)
						return res
							.status(error.duplicate.status)
							.json({ message: error.duplicate.message });
					else getField(res, model, { id }, done, true);
				},
				function (found, done) {
					updateField(res, found, { label: data.label }, done);
				},
			],
			function (updateFound) {
				if (updateFound)
					return res
						.status(success.update.status)
						.json({ message: success.update.message });
				else
					return res
						.status(error.op_failed.status)
						.json({ message: error.op_failed.message });
			}
		);
	},
	delete: function (res, model, id) {
		asyncLib.waterfall(
			[
				function (done) {
					getField(res, model, { id }, done, false);
				},
			],
			function (found) {
				actionDelete(res, found);
			}
		);
	},
};
