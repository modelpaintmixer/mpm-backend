"use strict"

module.exports = {
  up: queryInterface => {
    let date = new Date("2019-08-28T20:16:23.059Z")

    return queryInterface.bulkInsert("Users", [
      {
        id: 1,
        username: "modelpaint",
        name: "ModelPaintMixer.com admin",
        email: "modelpaint@modelpaintmixer.com",
        website: "https://modelpaintmixer.com",
        createdAt: date,
        updatedAt: date,
      },
    ])
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("Users", null, {})
  },
}
