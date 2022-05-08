'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ads', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      assos_user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Associations_users',
          key: 'id'
        }
      },
      difficulty_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Difficulties',
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
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      participants_max: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cp: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      commune: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Ads');
  }
};