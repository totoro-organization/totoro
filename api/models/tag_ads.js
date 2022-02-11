'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag_ads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Tag_ads.belongsTo(models.Ads, { foreignKey: 'ads_id' });
      models.Tag_ads.belongsTo(models.Tags, { foreignKey: 'tag_id' });
    }
  }
  Tag_ads.init({
    
  }, {
    sequelize,
    modelName: 'Tag_ads',
  });
  Tag_ads.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Tag_ads;
};