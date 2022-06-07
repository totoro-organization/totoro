"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Jobs extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Jobs.belongsTo(models.Status, {
				as: "status",
				foreignKey: "status_id",
			});
			models.Jobs.belongsTo(models.Associations_users, {
				as: "author",
				foreignKey: "assos_user_id",
			});
			models.Jobs.belongsTo(models.Difficulties, {
				as: "difficulty",
				foreignKey: "difficulty_id",
			});
			models.Jobs.hasMany(models.Favorites, {
				as: "favorites",
				onDelete: "cascade",
				foreignKey: "jobs_id",
			});
			models.Jobs.hasMany(models.Tag_jobs, {
				as: "tags",
				onDelete: "cascade",
				foreignKey: "jobs_id",
			});
			models.Jobs.hasMany(models.Attachment_jobs, {
				as: "attachments",
				onDelete: "cascade",
				foreignKey: "jobs_id",
			});
			models.Jobs.hasMany(models.Groups, {
				as: "participants",
				onDelete: "cascade",
				foreignKey: "jobs_id",
			});
		}
	}

	Jobs.init(
		{
			title: DataTypes.STRING,
			description: DataTypes.STRING,
			participants_max: DataTypes.INTEGER,
			address: DataTypes.STRING,
			cp: DataTypes.INTEGER,
			commune: DataTypes.STRING,
			start_date: DataTypes.DATE,
			end_date: DataTypes.DATE,
			longitude: DataTypes.FLOAT,
			latitude: DataTypes.FLOAT,      
			qrcode: DataTypes.STRING,
			code: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Jobs",
		}
	);

	Jobs.addHook("beforeSave", async (element) => {
		return (element.id = uuidv4());
	});

	return Jobs;
};
