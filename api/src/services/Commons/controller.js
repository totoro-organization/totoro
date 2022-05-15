const asyncLib = require("async");
const { Op } = require("sequelize");
const fs = require('fs');
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
	getAll: function (res, model, condition = null, exclude = null, include = null) {
		responseAll(model, res, condition, exclude, include);
	},
	getOne: function (res, model, id, exclude = null, include = null) {
		responseOne(model, res, id, exclude, include);
	},
	create: function (callback = null, res, model, data, condition=null, include = null, response = false) {
		asyncLib.waterfall(
			[
				function (done) {
					if(condition)
						getField(res, model, condition, done, true, include);
					else done(null, false);
				},
				function (result, done) {
					if (result){
						if(data.file)
							fs.unlinkSync(data.file.path);

						if(data.files){
							var object = data.files;
							for (const key in object) {
								if (Object.hasOwnProperty.call(object, key)) {
									const element = object[key];
									fs.unlinkSync(element[0].path);
								}
							}
						}
						res
							.status(error.duplicate.status)
							.json({ message: error.duplicate.message });
					}	
					else {
						createField(res, model, data, done, true);
					}
				},
				function (results, done) {
					if (results)
						if(response){
							done(results);
						} else {
							return res
							.status(success.create.status)
							.json({ message: success.create.message });
						}
					else
						return res
							.status(error.op_failed.status)
							.json({ message: error.op_failed.message });
				},
			], callback);
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

						if(condition && !(Object.keys(condition).length === 0))
							getField(
								res,
								model,
								{ ...condition, id: { [Op.ne]: id } },
								done,
								true
							);
						else done(null, false);
						
				},
				function (found, done) {
					if (found){
						if(data.file)
							fs.unlinkSync(data.file.path);

						if(data.files){
							var object = data.files;
							for (const key in object) {
								if (Object.hasOwnProperty.call(object, key)) {
									const element = object[key];
									fs.unlinkSync(element[0].path);
								}
							}
						}
						return res
							.status(error.duplicate.status)
							.json({ message: error.duplicate.message });
					}
					else getField(res, model, { id }, done, true);
				},
				function (found, done) {
					updateField(res, found, data, done);
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
	delete: function (res, model, condition) {
		asyncLib.waterfall(
			[
				function (done) {
					getField(res, model, condition, done, false);
				},
			],
			function (found) {
				actionDelete(res, found);
			}
		);
	},
};
