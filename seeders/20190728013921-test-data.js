"use strict"

module.exports = {
  up: queryInterface => {
    const sequelize = queryInterface.sequelize
    let originMap = {}
    let periodMap = {}
    let standardMap = {}
    let paintMap = {}
    let mixMap = {}
    let now = new Date()

    return Promise.all([
      sequelize.query("SELECT id, abbreviation FROM Origins;", {
        type: sequelize.QueryTypes.SELECT,
      }),
      sequelize.query("SELECT id, abbreviation FROM Periods;", {
        type: sequelize.QueryTypes.SELECT,
      }),
      sequelize.query("SELECT id, abbreviation FROM Standards;", {
        type: sequelize.QueryTypes.SELECT,
      }),
      sequelize.query("SELECT id, partNumber FROM Paints;", {
        type: sequelize.QueryTypes.SELECT,
      }),
    ])
      .then(resultLists => {
        for (let origin of resultLists[0]) {
          originMap[origin.abbreviation] = origin.id
        }
        for (let period of resultLists[1]) {
          periodMap[period.abbreviation] = period.id
        }
        for (let standard of resultLists[2]) {
          standardMap[standard.abbreviation] = standard.id
        }
        for (let paint of resultLists[3]) {
          paintMap[paint.partNumber] = paint.id
        }

        let mixes = [
          {
            name: "Khaki Green no. 3",
            originId: originMap["UK"],
            createdAt: now,
            updatedAt: now,
          },
          {
            name: "Silver Grey",
            originId: originMap["UK"],
            createdAt: now,
            updatedAt: now,
          },
          {
            name: "Portland Stone",
            originId: originMap["UK"],
            createdAt: now,
            updatedAt: now,
          },
          {
            name: "Light Stone",
            originId: originMap["UK"],
            createdAt: now,
            updatedAt: now,
          },
          {
            name: "Slate",
            originId: originMap["UK"],
            createdAt: now,
            updatedAt: now,
          },
        ]
        return queryInterface.bulkInsert("Mixes", mixes, {})
      })
      .then(() => {
        return sequelize.query("SELECT id, name FROM Mixes;", {
          type: sequelize.QueryTypes.SELECT,
        })
      })
      .then(results => {
        for (var mix of results) {
          mixMap[mix.name] = mix.id
        }

        let mixesStandards = [
          {
            standardId: standardMap["BSc"],
            mixId: mixMap["Silver Grey"],
            standardNumber: "28",
          },
          {
            standardId: standardMap["BSc"],
            mixId: mixMap["Portland Stone"],
            standardNumber: "64",
          },
          {
            standardId: standardMap["BSc"],
            mixId: mixMap["Light Stone"],
            standardNumber: "61",
          },
          {
            standardId: standardMap["BSc"],
            mixId: mixMap["Slate"],
            standardNumber: "34",
          },
        ]
        let mixesPeriods = [
          {
            mixId: mixMap["Khaki Green no. 3"],
            periodId: periodMap["WWII"],
          },
          {
            mixId: mixMap["Silver Grey"],
            periodId: periodMap["WWII"],
          },
          {
            mixId: mixMap["Portland Stone"],
            periodId: periodMap["WWII"],
          },
          {
            mixId: mixMap["Light Stone"],
            periodId: periodMap["WWII"],
          },
          {
            mixId: mixMap["Slate"],
            periodId: periodMap["WWII"],
          },
        ]
        let mixesPaints = [
          // Khaki Green no. 3
          {
            mixId: mixMap["Khaki Green no. 3"],
            paintId: paintMap["XF-62"],
            parts: 3,
          },
          {
            mixId: mixMap["Khaki Green no. 3"],
            paintId: paintMap["XF-59"],
            parts: 2,
          },
          // Silver Grey
          {
            mixId: mixMap["Silver Grey"],
            paintId: paintMap["XF-21"],
            parts: 1,
          },
          {
            mixId: mixMap["Silver Grey"],
            paintId: paintMap["XF-19"],
            parts: 1,
          },
          {
            mixId: mixMap["Silver Grey"],
            paintId: paintMap["XF-4"],
            parts: 1,
          },
          // Portland Stone
          {
            mixId: mixMap["Portland Stone"],
            paintId: paintMap["XF-2"],
            parts: 6,
          },
          {
            mixId: mixMap["Portland Stone"],
            paintId: paintMap["XF-3"],
            parts: 1,
          },
          {
            mixId: mixMap["Portland Stone"],
            paintId: paintMap["XF-57"],
            parts: 1,
          },
          // Light Stone
          {
            mixId: mixMap["Light Stone"],
            paintId: paintMap["XF-2"],
            parts: 7,
          },
          {
            mixId: mixMap["Light Stone"],
            paintId: paintMap["XF-3"],
            parts: 2,
          },
          {
            mixId: mixMap["Light Stone"],
            paintId: paintMap["XF-59"],
            parts: 2,
          },
          // Slate
          {
            mixId: mixMap["Slate"],
            paintId: paintMap["XF-24"],
            parts: 1,
          },
          {
            mixId: mixMap["Slate"],
            paintId: paintMap["XF-4"],
            parts: 1,
          },
        ]

        return Promise.all([
          queryInterface.bulkInsert("MixesStandards", mixesStandards, {}),
          queryInterface.bulkInsert("MixesPeriods", mixesPeriods, {}),
          queryInterface.bulkInsert("MixesPaints", mixesPaints, {}),
        ])
      })
  },

  down: () => {
    return
  },
}
