'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Logs.belongsTo(models.Admins, { foreignKey: 'admin_id' });
    }
  }
  Logs.init({
    table: DataTypes.STRING,
    action: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Logs',
  });
  Logs.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Logs;
};