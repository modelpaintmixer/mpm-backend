"use strict"

module.exports = (sequelize, DataTypes) => {
  const Paint = sequelize.define(
    "Paint",
    {
      partNumber: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      colorHex: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      colorRgb: DataTypes.STRING(12),
      colorHsl: DataTypes.STRING(25),
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
