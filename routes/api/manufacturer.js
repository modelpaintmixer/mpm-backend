/*
 * Functionality for /api/manufacturer
 */

const express = require("express")

const { Manufacturer, ManufacturerLocation, Origin } = require("../../models")

let router = express.Router()

router.get("/:id?", (req, res) => {
  if (req.params.id) {
    let id = req.params.id

    if (id.match(/^\d+$/)) {
      Manufacturer.findByPk(id, {
        include: [ManufacturerLocation, Origin],
      }).then(result => {
        if (result) {
          res.send({ manufacturer: result.get() })
        } else {
          let error = { message: `No manufacturer with id "${id}" found` }
          res.send({ error })
        }
      })
    } else {
      Manufacturer.findOne({
        include: [ManufacturerLocation, Origin],
        where: { name: id },
      }).then(result => {
        if (result) {
          res.send({ manufacturer: result.get() })
        } else {
          let error = { message: `No manufacturer with name "${id}" found` }
          res.send({ error })
        }
      })
    }
  } else {
    Manufacturer.findAll({
      include: [ManufacturerLocation, Origin],
      order: ["fullName"],
    }).then(results => {
      let manufacturers = results.map(item => item.get())
      res.send({ manufacturers })
    })
  }
})

router.get("/:id(\\d+)/paints", (req, res) => {
  let id = req.params.id

  Manufacturer.findByPk(id).then(mfr => {
    if (mfr) {
      mfr.getPaints({ order: ["id"] }).then(results => {
        let paints = results.map(item => item.get())
        res.send({ paints })
      })
    } else {
      let error = {
        message: `No manufacturer with id "${id}" found`,
      }

      res.send({ error })
    }
  })
})

module.exports = router
