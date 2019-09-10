/*
 * Functionality for /api/origin
 */

const express = require("express")

const { Origin, Manufacturer, Color, Paint, Standard } = require("../../models")

let router = express.Router()

router.get("/:id?", (req, res) => {
  if (req.params.id) {
    let id = req.params.id

    if (id.match(/^\d+$/)) {
      Origin.findByPk(id, {
        include: [Manufacturer, Color, Paint, Standard],
      }).then(result => {
        if (result) {
          res.send({ origin: result.get() })
        } else {
          let error = { message: `No origin with id "${id}" found` }
          res.send({ error })
        }
      })
    } else {
      Origin.findOne({
        include: [Manufacturer, Color, Paint, Standard],
        where: { name: id },
      }).then(result => {
        if (result) {
          res.send({ origin: result.get() })
        } else {
          let error = { message: `No origin with name "${id}" found` }
          res.send({ error })
        }
      })
    }
  } else {
    Origin.findAll({
      include: [Manufacturer, Color, Paint, Standard],
      order: ["name"],
    }).then(results => {
      let origins = results.map(item => item.get())
      res.send({ origins })
    })
  }
})

module.exports = router
