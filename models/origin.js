"use strict"

module.exports = (sequelize, DataTypes) => {
  const Origin = sequelize.define(
    "Origin",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      abbreviation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notes: DataTypes.TEXT,
    },
    { timestamps: false }
  )
  Origin.associate = function(models) {
    Origin.hasMany(models.Manufacturer)
    Origin.hasMany(models.Color)
    Origin.hasMany(models.Paint)
    Origin.hasMany(models.Standard)
  }

  return Origin
}
