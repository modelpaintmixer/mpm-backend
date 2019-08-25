"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("ManufacturerLocations", "manufacturerId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Manufacturers",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn(
      "ManufacturerLocations",
      "manufacturerId"
    )
  },
}
