'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parameters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Parameters.init({
    logo: DataTypes.STRING,
    icon: DataTypes.STRING,
    primary_theme: DataTypes.STRING,
    secondary_theme: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Parameters',
  });
  Parameters.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Parameters;
};