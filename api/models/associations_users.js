'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Associations_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Associations_users.hasMany(models.Ads, { foreignKey: 'assos_user_id' });
      models.Associations_users.belongsTo(models.Associations, { foreignKey: 'assos_id' });
      models.Associations_users.belongsTo(models.Users, { foreignKey: 'user_id' });      
      models.Associations_users.belongsTo(models.Roles, { foreignKey: 'role_id' });
    }
  }
  Associations_users.init({}, {
    sequelize,
    modelName: 'Associations_users',
  });
  Associations_users.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Associations_users;
};