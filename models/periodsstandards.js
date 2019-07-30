"use strict"

module.exports = sequelize => {
  const PeriodsStandards = sequelize.define(
    "PeriodsStandards",
    {},
    { timestamps: false }
  )

  return PeriodsStandards
}
