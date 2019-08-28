"use strict"

module.exports = {
  up: queryInterface => {
    const sequelize = queryInterface.sequelize
    let date = new Date("2019-08-28T20:25:43.669Z")

    return sequelize
      .query("SELECT id FROM Manufacturers WHERE name = 'Tamiya' LIMIT 1;", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(results => {
        const tamiyaId = results[0].id

        return queryInterface.bulkInsert(
          "ManufacturerLocations",
          [
            {
              manufacturerId: tamiyaId,
              isMain: true,
              url: "https://www.tamiya.com",
              street1: "3-7 Ondabara",
              street2: "Suruga-ku",
              city: "Shizuoka",
              state: "Shizuoka Prefecture",
              postalCode: "422-8022",
              country: "Japan",
              createdAt: date,
              updatedAt: date,
            },
            {
              manufacturerId: tamiyaId,
              isMain: false,
              url: "https://www.tamiyausa.com",
              street1: "36 Discovery #200",
              street2: "",
              city: "Irvine",
              state: "CA",
              postalCode: "92618",
              country: "USA",
              createdAt: date,
              updatedAt: date,
            },
          ],
          {}
        )
      })
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("ManufacturerLocations", null, {})
  },
}
