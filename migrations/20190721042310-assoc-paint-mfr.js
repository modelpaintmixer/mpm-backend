"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
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
  },

  down: queryInterface => {
    return queryInterface
      .removeIndex("Paints", "paints_mid_name_part")
      .then(() => {
        return queryInterface.removeColumn("Paints", "manufacturerId")
      })
  },
}
