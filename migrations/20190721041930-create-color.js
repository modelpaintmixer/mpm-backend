"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Colors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      credit: {
        type: Sequelize.STRING(100),
      },
      colorHex: {
        type: Sequelize.STRING(6),
        // allowNull: false,
      },
      colorRgb: {
        type: Sequelize.STRING(12),
        // allowNull: false,
      },
      description: {
        type: Sequelize.STRING(512),
      },
      notes: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable("Colors")
  },
}
