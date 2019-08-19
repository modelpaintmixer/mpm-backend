"use strict"

module.exports = {
  up: queryInterface => {
    let date = new Date()
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
          "Manufacturers",
          [
            {
              fullName: "Tamiya, Inc.",
              name: "Tamiya",
              originId: originsMap["JP"],
              createdAt: date,
              updatedAt: date,
            },
          ],
          {}
        )
      })
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("Manufacturers", null, {})
  },
}
