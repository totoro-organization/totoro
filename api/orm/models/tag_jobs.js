"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize) => {
	class Tag_jobs extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Tag_jobs.belongsTo(models.Jobs, {
				as: "job",
				foreignKey: "jobs_id",
			});
			models.Tag_jobs.belongsTo(models.Tags, {
				as: "tag",
				foreignKey: "tag_id",
			});
		}
	}

	Tag_jobs.init(
		{},
		{
			sequelize,
			modelName: "Tag_jobs",
		}
	);

	Tag_jobs.addHook("beforeSave", async (element) => {
		return (element.id = uuidv4());
	});

	return Tag_jobs;
};
