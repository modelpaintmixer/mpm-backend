"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Paints", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      partNumber: {
        type: Sequelize.STRING(16),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      colorHex: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      colorRgb: {
        type: Sequelize.STRING(12),
      },
      colorHsl: {
        type: Sequelize.STRING(25),
      },
      transparent: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      clear: {
        type: Sequelize.BOOLEAN,
        default: false,
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
    return queryInterface.dropTable("Paints")
  },
}
