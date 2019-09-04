"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    if (queryInterface.sequelize.getDialect() === "sqlite") {
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
    } else {
      return queryInterface.addColumn("Standards", "originId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Origins",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Standards", "originId")
  },
}
