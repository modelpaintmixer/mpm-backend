"use strict"

module.exports = (sequelize, DataTypes) => {
  const Paint = sequelize.define(
    "Paint",
    {
      partNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      colorHex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      colorRgb: DataTypes.STRING,
      colorHsl: DataTypes.STRING,
      transparent: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      clear: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      notes: DataTypes.TEXT,
    },
    {}
  )
  Paint.associate = function(models) {
    Paint.belongsToMany(models.Attribute, { through: "PaintsAttributes" })
    Paint.belongsToMany(models.Standard, { through: "PaintsStandards" })
    Paint.belongsToMany(models.Color, { through: "ColorsPaints" })
    Paint.belongsTo(models.Manufacturer)
    Paint.belongsTo(models.Origin)
    Paint.hasMany(models.ProductCode)
  }

  return Paint
}
