'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Associations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Associations.hasMany(models.Favorites, { foreignKey: 'assos_id' });
      models.Associations.hasMany(models.Associations_users, { foreignKey: 'assos_id' });
      models.Associations.hasMany(models.Subscriptions, { foreignKey: 'assos_id' });
      models.Associations.belongsTo(models.Status, { foreignKey: 'status_id' });
    }
  }
  Associations.init({
    siren: DataTypes.INTEGER,
    siret: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    creation_date: DataTypes.DATEONLY,
    activity: DataTypes.TEXT,
    address: DataTypes.STRING,
    cp: DataTypes.INTEGER,
    commune: DataTypes.STRING,
    logo: DataTypes.STRING,
    description: DataTypes.TEXT,
    link: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Associations',
  });
  Associations.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Associations;
};