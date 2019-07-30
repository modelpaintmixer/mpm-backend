"use strict"

module.exports = (sequelize, DataTypes) => {
  const Standard = sequelize.define(
    "Standard",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      abbreviation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      notes: DataTypes.TEXT,
    },
    { timestamps: false }
  )
  Standard.associate = function(models) {
    Standard.belongsToMany(models.Period, { through: "PeriodsStandards" })
    Standard.belongsToMany(models.Mix, { through: "MixesStandards" })
    Standard.belongsToMany(models.Paint, { through: "PaintsStandards" })
    Standard.belongsTo(models.Origin)
  }

  return Standard
}
