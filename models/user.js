"use strict"

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(320),
        allowNull: false,
      },
      country: DataTypes.STRING(2),
      state: DataTypes.STRING(40),
      website: DataTypes.STRING(100),
      occupation: DataTypes.STRING(100),
      biography: DataTypes.TEXT,
      interests: DataTypes.TEXT,
      lastVisit: DataTypes.DATE,
    },
    {}
  )
  User.associate = function(models) {
    User.hasMany(models.Color)
    User.hasMany(models.Image)
    User.hasMany(models.NewsItem)
  }

  return User
}
