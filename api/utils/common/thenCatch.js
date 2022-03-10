const { error, success } = require("./messages.json");

module.exports = {
	responseAll: function (model, res) {
		model
			.findAll()
			.then(function (results) {
				res.status(200).json({ total_rows: results.length, data: results });
			})
			.catch((err) => {
				res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},
	responseOne: function (model, res, id) {
		model
			.findOne({
				where: { id },
			})
			.then((result) => {
				if (result) res.status(200).json(result);
				else
					res
						.status(error.not_found.status)
						.json({ message: error.not_found.message });
			})
			.catch((err) => {
				res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},
	deleteOne: function (model, res, data) {
		model
			.destroy({ where: data })
			.then((result) => {
				res
					.status(success.delete.status)
					.json({ message: success.delete.message });
			})
			.catch((err) => {
				res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},
	actionDelete: function (res, found) {
		if (found) {
			module.exports.deleteOne(found, res, { id: found.id });
		} else
			res
				.status(error.not_found.status)
				.json({ message: error.not_found.message });
	},
	getField: function (res, model, condition, done, isContinue) {
		model
			.findOne({
				where: condition,
			})
			.then((result) => {
				if (isContinue) done(null, result);
				else done(result);
			})
			.catch((err) => {
				res.status(error.syntax_error.status).json({ message: err + "" });
			});
	},
	createField: function (res, model, data, done) {
		model
			.create(data)
			.then((newField) => done(newField))
			.catch((err) => {
				res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},
	updateField: function (res, model, data, done) {
		model
			.update(data)
			.then(() => done(model))
			.catch((err) => {
				res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},
	getRow: async function (model, condition) {
		try {
			const { dataValues } = await model.findOne({ where: condition });
			return dataValues;
		} catch (error) {
			console.log(error);
		}
	},
	getRows: async function (model, condition = null) {
		try {
			condition = condition ?? { where: condition };
			const request = await model.findAll(condition);
			const values = [];
			for (const row of request) {
				values.push(row.dataValues);
			}
			return values;
		} catch (error) {
			console.log(error);
		}
	},
};
