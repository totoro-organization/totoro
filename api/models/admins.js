'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Admins.hasMany(models.Logs, { foreignKey: 'admin_id' });
      models.Admins.belongsTo(models.Roles, { foreignKey: 'role_id' });
      models.Admins.belongsTo(models.Status, { foreignKey: 'status_id' });
    }
  }
  Admins.init({
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admins',
  });
  Admins.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Admins;
};