"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    if (queryInterface.sequelize.getDialect() === "sqlite") {
      return queryInterface
        .addColumn("ManufacturerLocations", "manufacturerId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Manufacturers",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        })
        .then(() => {
          queryInterface.changeColumn(
            "ManufacturerLocations",
            "manufacturerId",
            {
              type: Sequelize.INTEGER,
              allowNull: false,
            }
          )
        })
    } else {
      return queryInterface.addColumn(
        "ManufacturerLocations",
        "manufacturerId",
        {
          type: Sequelize.INTEGER,
          references: {
            model: "Manufacturers",
            key: "id",
          },
          allowNull: false,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        }
      )
    }
  },

  down: queryInterface => {
    return queryInterface.removeColumn(
      "ManufacturerLocations",
      "manufacturerId"
    )
  },
}
