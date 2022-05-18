'use strict';
const { v4: uuidv4 } = require("uuid");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Types_discounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Types_discounts.hasMany(models.Discounts, {as: 'discounts', onDelete: 'cascade', foreignKey: 'type_disc_id' });
    }
  }
  Types_discounts.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Types_discounts',
  });
  Types_discounts.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Types_discounts;
};