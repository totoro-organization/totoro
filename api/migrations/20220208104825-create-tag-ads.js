'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tag_ads', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      tag_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Tags',
          key: 'id'
        }
      },
      ads_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Ads',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tag_ads');
  }
};