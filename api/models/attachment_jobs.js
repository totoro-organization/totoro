"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Attachment_jobs extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Attachment_jobs.belongsTo(models.Jobs, {
				as: "job",
				foreignKey: "jobs_id",
			});
		}
	}

	Attachment_jobs.init(
		{
			original_name: DataTypes.STRING,
			type: DataTypes.STRING,
			image: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Attachment_jobs",
		}
	);

	Attachment_jobs.addHook("beforeSave", async (element) => {
		return (element.id = uuidv4());
	});

	return Attachment_jobs;
};
