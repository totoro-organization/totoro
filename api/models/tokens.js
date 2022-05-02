'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Tokens.belongsTo(models.Discounts, { foreignKey: 'discount_id' });
      models.Tokens.belongsTo(models.Users, { foreignKey: 'user_id' });
      models.Tokens.belongsTo(models.Status, { foreignKey: 'status_id' });

    }
  }
  Tokens.init({
    qrcode: DataTypes.STRING,
    code: DataTypes.STRING,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tokens',
  });
  Tokens.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Tokens;
};