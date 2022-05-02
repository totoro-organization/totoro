'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Groups.belongsTo(models.Ads, { foreignKey: 'ads_id' });
      models.Groups.belongsTo(models.Users, { foreignKey: 'user_id' });
      models.Groups.hasMany(models.Litigations, { foreignKey: 'group_id' });
      models.Groups.hasMany(models.Chats, { foreignKey: 'group_id' });

    }
  }
  Groups.init({
    
  }, {
    sequelize,
    modelName: 'Groups',
  });
  Groups.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } );
  return Groups;
};