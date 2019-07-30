"use strict"

module.exports = {
  up: queryInterface => {
    let originsMap = {}
    const sequelize = queryInterface.sequelize

    return sequelize
      .query("SELECT id, abbreviation FROM Origins;", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(results => {
        for (let row of results) {
          originsMap[row.abbreviation] = row.id
        }

        return queryInterface.bulkInsert(
          "Standards",
          [
            {
              name: "Army-Navy Aeronautical",
              displayName: "ANA ",
              abbreviation: "ANA",
              originId: originsMap["USA"],
            },
            {
              name: "Federal Standard 595c",
              displayName: "FS",
              abbreviation: "FS",
              originId: originsMap["USA"],
            },
            {
              name: "RAL Classic",
              displayName: "RAL ",
              abbreviation: "RAL",
              originId: originsMap["DE"],
            },
            {
              name: "Reichsluftfahrtministerium",
              displayName: "RLM ",
              abbreviation: "RLM",
              originId: originsMap["DE"],
            },
            {
              name: "British Standard 381c",
              displayName: "BSc no. ",
              abbreviation: "BSc",
              originId: originsMap["UK"],
            },
            {
              name: "British Standard BS4800",
              displayName: "BS ",
              abbreviation: "BS",
              originId: originsMap["UK"],
            },
          ],
          {}
        )
      })
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("Standards", null, {})
  },
}
