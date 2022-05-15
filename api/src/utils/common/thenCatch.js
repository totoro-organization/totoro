const { error, success } = require("./messages.json");

module.exports = {
	responseAll: function (model, res, condition = null, exclude=null, include = null) {
		const params = {
			attributes: {exclude},
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
	responseOne: function (model, res, id, exclude=null, include = null) {
		const params = {
			attributes: {exclude},
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
	getField: function (res, model, condition, done, isContinue=false, include = null, exclude=null,) {
		const params = {
			attributes: {exclude},
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
	createField: function (res, model, data, done, isContinue=false) {
		if(data.files){
			let object = data.files;
			for (const key in object) {
				if (Object.hasOwnProperty.call(object, key)) {
					const element = object[key];
					data[key] = `${data.path}/${element[0].filename}`;
					if(data.file_type){
						data.original_name = element[0].originalname;
						data.type = element[0].mimetype;
						delete data.file_type;
					}
				}
			}
			delete data.files;
			delete data.path;
		}

		if(data.file){
			data[data.file.fieldname] = `${data.path}/${data.file.filename}`;
			if(data.file_type){
				data.original_name = data.file.originalname;
				data.type = data.file.mimetype;
				delete data.file_type;
			}
			delete data.file;
			delete data.path;
		}

		model
			.create(data)
			.then((newField) => {
				if (isContinue) done(null, newField);
				else done(newField);
			})
			.catch((err) => {
				return res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},
	updateField: function (res, model, data, done) {
		if(data.files){
			let object = data.files;
			for (const key in object) {
				if (Object.hasOwnProperty.call(object, key)) {
					const element = object[key];
					data[key] = `${data.path}/${element[0].filename}`;
					if(data.file_type){
						data.original_name = element[0].originalname;
						data.type = element[0].mimetype;
						delete data.file_type;
					}
				}
			}
			delete data.files;
			delete data.path;
		}
		if(data.file){
			data[data.file.fieldname] = `${data.path}/${data.file.filename}`;
			if(data.file_type){
				data.original_name = data.file.originalname;
				data.type = data.file.mimetype;
				delete data.file_type;
			}
			delete data.file;
			delete data.path;
		}

		model
			.update(data)
			.then(() => done(model))
			.catch((err) => {
				return res
					.status(error.syntax_error.status)
					.json({ message: error.syntax_error.message });
			});
	},
	getRow: async function (res, model, condition = null, include = null) {
		try {
			const params = {
				where: condition,
				include,
			};
			const data = await model.findOne(params);
			if(data){
				return data.dataValues;
			}else{
				return res
						.status(error.not_exist.status)
						.json({ message: error.not_exist.message });
			}
			
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
