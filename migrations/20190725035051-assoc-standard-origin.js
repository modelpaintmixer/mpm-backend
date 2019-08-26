"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("Standards", "originId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Origins",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      .then(() => {
        queryInterface.changeColumn("Standards", "originId", {
          type: Sequelize.INTEGER,
          allowNull: false,
        })
      })
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Standards", "originId")
  },
}
