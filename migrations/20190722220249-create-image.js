"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      path: {
        type: Sequelize.STRING(1024),
        allowNull: false,
      },
      sizeX: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sizeY: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dominantColor: {
        type: Sequelize.STRING(6),
        allowNull: false,
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
    return queryInterface.dropTable("Images")
  },
}
