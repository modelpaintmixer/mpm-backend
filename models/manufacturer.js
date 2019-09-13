"use strict"

module.exports = (sequelize, DataTypes) => {
  const Manufacturer = sequelize.define(
    "Manufacturer",
    {
      fullName: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
      },
      notes: DataTypes.TEXT,
    },
    {}
  )
  Manufacturer.associate = function(models) {
    Manufacturer.belongsTo(models.Origin)
    Manufacturer.hasMany(models.ManufacturerLocation)
    Manufacturer.hasMany(models.Paint)
  }

  return Manufacturer
}
