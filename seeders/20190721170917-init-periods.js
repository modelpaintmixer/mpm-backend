"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      "Periods",
      [
        {
          name: "Pre-World War I",
          abbreviation: "Pre-WWI",
          fromYear: 0,
          toYear: 1914,
        },
        {
          name: "First World War",
          abbreviation: "WWI",
          fromYear: 1914,
          toYear: 1918,
        },
        {
          name: "Second World War",
          abbreviation: "WWII",
          fromYear: 1939,
          toYear: 1945,
        },
        {
          name: "Cold War",
          abbreviation: "Cold War",
          fromYear: 1947,
          toYear: 1991,
        },
        {
          name: "Post-Cold War",
          abbreviation: "Modern",
          fromYear: 1991,
          toYear: 0,
        },
      ],
      {}
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("Periods", null, {})
  },
}
