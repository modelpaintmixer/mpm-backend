"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("PaintsAttributes", {
      paintId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Paints",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      attributeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Attributes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("PaintsAttributes")
  },
}
