"use strict"

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: DataTypes.STRING,
      state: DataTypes.STRING,
      website: DataTypes.STRING,
      occupation: DataTypes.STRING,
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
