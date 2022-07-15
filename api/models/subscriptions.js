"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
var moment = require('moment');

module.exports = (sequelize, DataTypes) => {
	class Subscriptions extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Subscriptions.belongsTo(models.Pricings, {
				as: "pricing",
				foreignKey: "pricing_id",
			});
			models.Subscriptions.belongsTo(models.Status, {
				as: "status",
				foreignKey: "status_id",
			});
			models.Subscriptions.belongsTo(models.Associations, {
				as: "organization",
				foreignKey: "assos_id",
			});
		}
	}

	Subscriptions.init(
		{
			expirate: DataTypes.DATE,
			current: DataTypes.BOOLEAN,
			isExpired: {
				type: DataTypes.VIRTUAL,
				get() {
					if(this.expirate){
						var date = new Date();
						var data_now = moment(date).format("YYYY-MM-DD");
						return data_now > moment(this.expirate).format("YYYY-MM-DD");
					} else {
						return "infinite"
					}
				}
			}
		},
		{
			sequelize,
			modelName: "Subscriptions",
		}
	);

	Subscriptions.addHook("beforeSave", async (element) => {
		return (element.id = uuidv4());
	});

	return Subscriptions;
};
