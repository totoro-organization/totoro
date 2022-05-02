'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Discounts.belongsTo(models.Types_discounts, { foreignKey: 'type_disc_id' });
      models.Discounts.belongsTo(models.Partners, { foreignKey: 'partner_id' });

      models.Discounts.hasMany(models.Tokens, { foreignKey: 'discount_id' });
      
    }
  }
  Discounts.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    condition: DataTypes.TEXT,
    cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Discounts',
  });
  return Discounts;
};