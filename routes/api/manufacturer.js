/*
 * Functionality for /api/manufacturer
 */

const express = require("express")

const {
  Manufacturer,
  ManufacturerLocation,
  Origin,
  Sequelize,
} = require("../../models")
const { like } = Sequelize.Op

let router = express.Router()

router.get("/:id(\\d+)?", (req, res) => {
  let queryOpts = {
    include: [ManufacturerLocation, Origin],
    order: ["fullName"],
    where: {},
  }

  if (req.params.id) {
    queryOpts.where.id = req.params.id
  }
  if (req.query.name) {
    queryOpts.where.fullName = { [like]: `%${req.query.name}%` }
  }

  Manufacturer.findAll(queryOpts).then(results => {
    let manufacturers = results.map(item => item.get())
    res.send({ manufacturers, timestamp: Date.now() })
  })
})

router.get("/:id/paints", (req, res) => {
  let id = req.params.id

  Manufacturer.findByPk(id).then(mfr => {
    mfr.getPaints({ order: ["id"] }).then(results => {
      let paints = results.map(item => item.get())
      res.send({ paints, timestamp: Date.now() })
    })
  })
})

module.exports = router
