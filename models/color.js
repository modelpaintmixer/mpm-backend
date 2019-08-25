"use strict"

module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "Color",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      credit: DataTypes.STRING,
      colorHex: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      colorRgb: DataTypes.STRING,
      colorHsl: DataTypes.STRING,
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
