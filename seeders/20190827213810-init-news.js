"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("NewsItems", [
      {
        headline: "We now have a news system",
        content: `As of Labor Day weekend, we have a simple news/events
reporting system. These will appear in the "**Newest Changes**" streams,
interspersed with other new items.`,
        userId: 1,
        createdAt: new Date("2019-08-27T21:36:32.972Z"),
        updatedAt: new Date("2019-08-27T21:36:32.972Z"),
      },
    ])
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("NewsItems", null, {})
  },
}
