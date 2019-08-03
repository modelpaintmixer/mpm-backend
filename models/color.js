"use strict"

module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "Color",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      owner: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      credit: DataTypes.STRING,
      colorHex: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      colorRgb: DataTypes.STRING,
      colorHsl: DataTypes.STRING,
      swatchType: DataTypes.STRING,
      swatchValue: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      notes: DataTypes.TEXT,
    },
    {}
  )
  Color.associate = function(models) {
    Color.belongsToMany(models.Standard, { through: "ColorsStandards" })
    Color.belongsToMany(models.Period, { through: "ColorsPeriods" })
    Color.belongsToMany(models.Paint, { through: "ColorsPaints" })
    Color.belongsTo(models.Origin)
    Color.hasMany(models.Image)
  }

  return Color
}
