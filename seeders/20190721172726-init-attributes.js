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
          description: "A completely gloss finish",
        },
        {
          name: "flat",
          description: "A completely matte/flat finish",
        },
        {
          name: "satin",
          description: "A semi-gloss or satin finish",
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
