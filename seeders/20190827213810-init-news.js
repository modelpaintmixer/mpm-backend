"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("NewsItems", [
      {
        headline: "We now have a news system",
        slug: "We now have a news system".replace(/[^\w]/g, ""),
        content: `As of Labor Day weekend, we have a simple news/events
reporting system. These will appear in the "**Newest Changes**" streams,
interspersed with other new items.`,
        userId: 1,
        createdAt: new Date("2019-08-31T20:13:30.887Z"),
        updatedAt: new Date("2019-08-31T20:13:30.887Z"),
      },
      {
        headline: "Progress on user accounts",
        slug: "Progress on user accounts".replace(/[^\w]/g, ""),
        content: `User accounts are closer to being opened up for everyone.
We will be using [Auth0](https://www.auth0.com) for password/login management,
which will let users use certain social accounts (Facebook, Google) to log in
rather than creating a new password (if you so choose).

Initially, user activity will be limited to comments (and when ratings are
implemented, rating colors) and managing their individual profile. It will be
a while yet before creating/editing colors, images, etc. is ready to go.

Please remember that the site is still under HEAVY construction, so anything
that gets created before the full launch *might* end up being lost at some
point. We're trying very hard to keep that from happening, though.`,
        userId: 2,
        createdAt: new Date("2019-09-02T17:13:30.887Z"),
        updatedAt: new Date("2019-09-02T17:13:30.887Z"),
      },
    ])
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("NewsItems", null, {})
  },
}
