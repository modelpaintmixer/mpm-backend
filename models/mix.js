"use strict"

module.exports = (sequelize, DataTypes) => {
  const Mix = sequelize.define(
    "Mix",
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
  Mix.associate = function(models) {
    Mix.belongsToMany(models.Standard, { through: "MixesStandards" })
    Mix.belongsToMany(models.Period, { through: "MixesPeriods" })
    Mix.belongsToMany(models.Paint, { through: "MixesPaints" })
    Mix.belongsTo(models.Origin)
    Mix.hasMany(models.Image)
  }

  return Mix
}
