"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    if (queryInterface.sequelize.getDialect() === "sqlite") {
      return queryInterface
        .addColumn("ProductCodes", "paintId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Paints",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        })
        .then(() => {
          queryInterface.changeColumn("ProductCodes", "paintId", {
            type: Sequelize.INTEGER,
            allowNull: false,
          })
        })
    } else {
      return queryInterface.addColumn("ProductCodes", "paintId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Paints",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  },

  down: queryInterface => {
    return queryInterface.removeColumn("ProductCodes", "paintId")
  },
}
