"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      "Attributes",
      [
        {
          name: "acrylic",
          description: "Water/alcohol based",
        },
        {
          name: "enamel",
          description: "Oil based",
        },
        {
          name: "lacquer",
          description: "Lacquer based",
        },
        {
          name: "gloss",
          description: "Has a completely gloss finish",
        },
        {
          name: "flat",
          description: "Has a completely matte/flat finish",
        },
        {
          name: "satin",
          description: "Has a semi-gloss or satin finish",
        },
        {
          name: "transparent",
          description:
            "Translucent, allowing the under color to affect the final color",
        },
        {
          name: "clear",
          description: "A completely clear/colorless varnish",
        },
      ],
      {}
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("Attributes", null, {})
  },
}
