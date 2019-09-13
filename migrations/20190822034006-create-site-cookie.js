"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SiteCookies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
      },
      needed: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      duration: {
        type: Sequelize.STRING(16),
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      inUse: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable("SiteCookies")
  },
}
