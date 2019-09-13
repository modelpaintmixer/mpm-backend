"use strict"

module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "Color",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      credit: DataTypes.STRING(100),
      colorHex: {
        type: DataTypes.STRING(6),
        // allowNull: false,
      },
      colorRgb: DataTypes.STRING(12),
      colorHsl: DataTypes.STRING(25),
      description: DataTypes.STRING(512),
      notes: DataTypes.TEXT,
    },
    {}
  )
  Color.associate = models => {
    Color.belongsToMany(models.Standard, { through: "ColorsStandards" })
    Color.belongsToMany(models.Period, { through: "ColorsPeriods" })
    Color.belongsToMany(models.Paint, { through: "ColorsPaints" })
    Color.belongsTo(models.Origin)
    Color.belongsTo(models.User)
  }

  return Color
}
