"use strict"

module.exports = {
  up: queryInterface => {
    let now = new Date()

    return queryInterface.bulkInsert(
      "SiteCookies",
      [
        {
          name: "signupSeen",
          needed: false,
          duration: "1y",
          description: `Used to signal whether the user has seen the "sign-up"
message on the home page. Once this is set, the sign-up box will not
reappear.`,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "consent-is",
          needed: true,
          duration: "1y",
          description: `Used by the CookieHub.com cookie-consent manager code.
It tracks the level of consent that the user has granted to this site, and
is used in determining what additional cookie-driven functionality (such as
analytics) should be enabled.

If deleted, this will trigger the cookie-consent banner to reappear upon the
next load of a page.`,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("SiteCookies", null, {})
  },
}
