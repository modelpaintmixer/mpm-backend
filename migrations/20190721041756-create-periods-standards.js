"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("PeriodsStandards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      periodId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Periods",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("PeriodsStandards")
  },
}
