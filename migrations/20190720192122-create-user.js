"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(64),
        unique: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(320),
        unique: true,
      },
      country: Sequelize.STRING(2),
      state: Sequelize.STRING(40),
      website: Sequelize.STRING(100),
      occupation: Sequelize.STRING(100),
      biography: Sequelize.TEXT,
      interests: Sequelize.TEXT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      lastVisit: Sequelize.DATE,
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("Users")
  },
}
