'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tokens', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Users',
          key: 'id'
        }
      },
      discount_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Discounts',
          key: 'id'
        }
      },
      status_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Status',
          key: 'id'
        }
      },
      qrcode: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nb_token: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Tokens');
  }
};