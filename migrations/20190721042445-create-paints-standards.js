"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("PaintsStandards", {
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
      standardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Standards",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      standardNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("PaintsStandards")
  },
}
