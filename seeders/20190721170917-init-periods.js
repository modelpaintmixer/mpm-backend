"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      "Periods",
      [
        {
          name: "Pre-World War I",
          abbreviation: "Pre-WWI",
        },
        {
          name: "First World War",
          abbreviation: "WWI",
        },
        {
          name: "Second World War",
          abbreviation: "WWII",
        },
        {
          name: "Cold War (Post-WWII)",
          abbreviation: "Cold War",
        },
        {
          name: "Post-Cold War",
          abbreviation: "Modern",
        },
      ],
      {}
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("Periods", null, {})
  },
}
