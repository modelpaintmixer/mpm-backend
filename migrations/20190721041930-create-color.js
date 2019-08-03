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
        type: Sequelize.STRING,
        allowNull: false,
      },
      owner: {
        type: Sequelize.INTEGER,
        // allowNull: false,
      },
      credit: {
        type: Sequelize.STRING,
      },
      colorHex: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      colorRgb: {
        type: Sequelize.STRING,
      },
      colorHsl: {
        type: Sequelize.STRING,
      },
      swatchType: {
        type: Sequelize.STRING,
      },
      swatchValue: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT,
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
