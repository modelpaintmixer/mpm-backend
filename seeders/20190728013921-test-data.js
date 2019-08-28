"use strict"

module.exports = {
  up: queryInterface => {
    const sequelize = queryInterface.sequelize
    let originMap = {}
    let periodMap = {}
    let standardMap = {}
    let paintMap = {}
    let colorMap = {}
    let date = new Date("2019-08-28T20:35:31.826Z")

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

        let colors = [
          {
            userId: 1,
            name: "Khaki Green no. 3",
            credit: "Mike Starmer",
            originId: originMap["UK"],
            createdAt: date,
            updatedAt: date,
          },
          {
            userId: 1,
            name: "Silver Grey",
            credit: "Mike Starmer",
            originId: originMap["UK"],
            createdAt: date,
            updatedAt: date,
          },
          {
            userId: 1,
            name: "Portland Stone",
            credit: "Mike Starmer",
            originId: originMap["UK"],
            createdAt: date,
            updatedAt: date,
          },
          {
            userId: 1,
            name: "Light Stone",
            credit: "Mike Starmer",
            originId: originMap["UK"],
            createdAt: date,
            updatedAt: date,
          },
          {
            userId: 1,
            name: "Slate",
            credit: "Mike Starmer",
            originId: originMap["UK"],
            createdAt: date,
            updatedAt: date,
          },
        ]
        return queryInterface.bulkInsert("Colors", colors, {})
      })
      .then(() => {
        return sequelize.query("SELECT id, name FROM Colors;", {
          type: sequelize.QueryTypes.SELECT,
        })
      })
      .then(results => {
        for (var color of results) {
          colorMap[color.name] = color.id
        }

        let colorsStandards = [
          {
            standardId: standardMap["BSc"],
            colorId: colorMap["Silver Grey"],
            standardNumber: "28",
          },
          {
            standardId: standardMap["BSc"],
            colorId: colorMap["Portland Stone"],
            standardNumber: "64",
          },
          {
            standardId: standardMap["BSc"],
            colorId: colorMap["Light Stone"],
            standardNumber: "61",
          },
          {
            standardId: standardMap["BSc"],
            colorId: colorMap["Slate"],
            standardNumber: "34",
          },
        ]
        let colorsPeriods = [
          {
            colorId: colorMap["Khaki Green no. 3"],
            periodId: periodMap["WWII"],
          },
          {
            colorId: colorMap["Silver Grey"],
            periodId: periodMap["WWII"],
          },
          {
            colorId: colorMap["Portland Stone"],
            periodId: periodMap["WWII"],
          },
          {
            colorId: colorMap["Light Stone"],
            periodId: periodMap["WWII"],
          },
          {
            colorId: colorMap["Slate"],
            periodId: periodMap["WWII"],
          },
        ]
        let colorsPaints = [
          // Khaki Green no. 3
          {
            colorId: colorMap["Khaki Green no. 3"],
            paintId: paintMap["XF-62"],
            parts: 3,
          },
          {
            colorId: colorMap["Khaki Green no. 3"],
            paintId: paintMap["XF-59"],
            parts: 2,
          },
          // Silver Grey
          {
            colorId: colorMap["Silver Grey"],
            paintId: paintMap["XF-21"],
            parts: 1,
          },
          {
            colorId: colorMap["Silver Grey"],
            paintId: paintMap["XF-19"],
            parts: 1,
          },
          {
            colorId: colorMap["Silver Grey"],
            paintId: paintMap["XF-4"],
            parts: 1,
          },
          // Portland Stone
          {
            colorId: colorMap["Portland Stone"],
            paintId: paintMap["XF-2"],
            parts: 6,
          },
          {
            colorId: colorMap["Portland Stone"],
            paintId: paintMap["XF-3"],
            parts: 1,
          },
          {
            colorId: colorMap["Portland Stone"],
            paintId: paintMap["XF-57"],
            parts: 1,
          },
          // Light Stone
          {
            colorId: colorMap["Light Stone"],
            paintId: paintMap["XF-2"],
            parts: 7,
          },
          {
            colorId: colorMap["Light Stone"],
            paintId: paintMap["XF-3"],
            parts: 2,
          },
          {
            colorId: colorMap["Light Stone"],
            paintId: paintMap["XF-59"],
            parts: 2,
          },
          // Slate
          {
            colorId: colorMap["Slate"],
            paintId: paintMap["XF-24"],
            parts: 1,
          },
          {
            colorId: colorMap["Slate"],
            paintId: paintMap["XF-4"],
            parts: 1,
          },
        ]

        return Promise.all([
          queryInterface.bulkInsert("ColorsStandards", colorsStandards, {}),
          queryInterface.bulkInsert("ColorsPeriods", colorsPeriods, {}),
          queryInterface.bulkInsert("ColorsPaints", colorsPaints, {}),
        ])
      })
  },

  down: () => {
    return
  },
}
