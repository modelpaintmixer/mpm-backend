"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      "Origins",
      [
        {
          name: "No Origin",
          abbreviation: "none",
        },
        {
          name: "United States of America",
          abbreviation: "USA",
        },
        {
          name: "United Kingdom",
          abbreviation: "UK",
        },
        {
          name: "Germany",
          abbreviation: "DE",
        },
        {
          name: "Japan",
          abbreviation: "JP",
        },
        {
          name: "Soviet Union",
          abbreviation: "USSR",
        },
        {
          name: "Russia",
          abbreviation: "RU",
        },
        {
          name: "North Atlantic Treaty Organization",
          abbreviation: "NATO",
        },
        {
          name: "Warsaw Pact",
          abbreviation: "WP",
        },
      ],
      {}
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("Origins", null, {})
  },
}
