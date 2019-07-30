"use strict"

module.exports = sequelize => {
  const MixesPeriods = sequelize.define(
    "MixesPeriods",
    {},
    { timestamps: false }
  )
  MixesPeriods.associate = function(models) {
    const Mix = models.Mix
    const Period = models.Period

    Mix.belongsToMany(Period, {
      through: { model: MixesPeriods, unique: false },
      foreignKey: "mixId",
    })
    Period.belongsToMany(Mix, {
      through: { model: MixesPeriods, unique: false },
      foreignKey: "periodId",
    })
  }

  return MixesPeriods
}
