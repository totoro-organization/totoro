const { error, success } = require("./messages.json");

module.exports = {
	responseAll: function (model, res, condition = null, include = null) {
		const params = {
			where: condition,
			include,
		};
		model
			.findAll(params)
			.then(function (results) {
				return res.status(200).json({ total_rows: results.length, data: results });
			})
			.catch((err) => {
				return res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},
	responseOne: function (model, res, id, include = null) {
		const params = {
			where: { id },
			include,
		};
		model
			.findOne(params)
			.then((result) => {
				if (result) return res.status(200).json(result);
				else
					return res
						.status(error.not_found.status)
						.json({ message: error.not_found.message });
			})
			.catch((err) => {
				return res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},
	deleteOne: function (model, res, data) {
		model
			.destroy({ where: data })
			.then((result) => {
				return res
					.status(success.delete.status)
					.json({ message: success.delete.message });
			})
			.catch((err) => {
				return res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},
	actionDelete: function (res, found) {
		if (found) {
			module.exports.deleteOne(found, res, { id: found.id });
		} else
			return res
				.status(error.not_found.status)
				.json({ message: error.not_found.message });
	},
	getField: function (res, model, condition, done, isContinue, include = null) {
		const params = {
			where: condition,
			include,
		};
		model
			.findOne(params)
			.then((result) => {
				if (isContinue) done(null, result);
				else done(result);
			})
			.catch((err) => {
				return res.status(error.syntax_error.status).json({ message: err + "" });
			});
	},
	createField: function (res, model, data, done) {
		model
			.create(data)
			.then((newField) => done(newField))
			.catch((err) => {
				return res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},
	updateField: function (res, model, data, done) {
		model
			.update(data)
			.then(() => done(model))
			.catch((err) => {
				return res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},
	getRow: async function (model, condition = null, include = null) {
		try {
			const params = {
				where: condition,
				include,
			};
			const { dataValues } = await model.findOne(params);
			return dataValues;
		} catch (error) {
			console.log(error);
		}
	},
	getRows: async function (model, condition = null, include = null) {
		try {
			const params = {
				where: condition,
				include,
			};
			const request = await model.findAll(params);
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
