"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ManufacturerLocations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isMain: {
        type: Sequelize.BOOLEAN,
      },
      url: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      street1: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      street2: {
        type: Sequelize.STRING(100),
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      postalCode: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(2),
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
    return queryInterface.dropTable("ManufacturerLocations")
  },
}
