"use strict"

module.exports = {
  up: queryInterface => {
    let standardsMap = {}
    let periodsMap = {}
    const sequelize = queryInterface.sequelize

    return sequelize
      .query("SELECT id, abbreviation FROM Standards;", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(results => {
        for (let row of results) {
          standardsMap[row.abbreviation] = row.id
        }

        return sequelize.query("SELECT id, abbreviation FROM Periods;", {
          type: sequelize.QueryTypes.SELECT,
        })
      })
      .then(results => {
        for (let row of results) {
          periodsMap[row.abbreviation] = row.id
        }

        return queryInterface.bulkInsert(
          "PeriodsStandards",
          [
            {
              // ANA -> WWII
              standardId: standardsMap["ANA"],
              periodId: periodsMap["WWII"],
            },
            {
              // FS 595c -> Cold War
              standardId: standardsMap["FS"],
              periodId: periodsMap["Cold War"],
            },
            {
              // FS 595c -> Modern
              standardId: standardsMap["FS"],
              periodId: periodsMap["Modern"],
            },
            {
              // RAL -> WWII
              standardId: standardsMap["RAL"],
              periodId: periodsMap["WWII"],
            },
            {
              // RLM -> WWII
              standardId: standardsMap["RLM"],
              periodId: periodsMap["WWII"],
            },
            {
              // BSc -> WWII
              standardId: standardsMap["BSc"],
              periodId: periodsMap["WWII"],
            },
            {
              // BS -> Cold War
              standardId: standardsMap["BS"],
              periodId: periodsMap["Cold War"],
            },
            {
              // BS -> Modern
              standardId: standardsMap["BS"],
              periodId: periodsMap["Modern"],
            },
          ],
          {}
        )
      })
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("PeriodsStandards", null, {})
  },
}
