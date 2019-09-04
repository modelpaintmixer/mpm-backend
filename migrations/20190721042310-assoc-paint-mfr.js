"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    if (queryInterface.sequelize.getDialect() === "sqlite") {
      return queryInterface
        .addColumn("Paints", "manufacturerId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Manufacturers",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        })
        .then(() => {
          queryInterface.changeColumn("Paints", "manufacturerId", {
            type: Sequelize.INTEGER,
            allowNull: false,
          })
        })
        .then(() => {
          return queryInterface.addIndex("Paints", {
            fields: ["manufacturerId", "name", "partNumber"],
            name: "paints_mid_name_part",
          })
        })
    } else {
      return queryInterface.addColumn("Paints", "manufacturerId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Manufacturers",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  },

  down: queryInterface => {
    return queryInterface
      .removeIndex("Paints", "paints_mid_name_part")
      .then(() => {
        return queryInterface.removeColumn("Paints", "manufacturerId")
      })
  },
}
