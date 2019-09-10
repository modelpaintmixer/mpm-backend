/*
 * Functionality for /api/paint
 */

const express = require("express")

const { Paint, Manufacturer, Origin, ProductCode } = require("../../models")

let router = express.Router()

router.get("/:id?", (req, res) => {
  if (req.params.id) {
    let id = req.params.id

    if (id.match(/^\d+$/)) {
      Paint.findByPk(id, {
        include: [Manufacturer, Origin, ProductCode],
      }).then(result => {
        if (result) {
          res.send({ paint: result.get() })
        } else {
          let error = { message: `No paint with id "${id}" found` }
          res.send({ error })
        }
      })
    } else {
      Paint.findOne({
        include: [Manufacturer, Origin, ProductCode],
        where: { name: id },
      }).then(result => {
        if (result) {
          res.send({ paint: result.get() })
        } else {
          let error = { message: `No paint with name "${id}" found` }
          res.send({ error })
        }
      })
    }
  } else {
    Paint.findAll({
      include: [Manufacturer, Origin, ProductCode],
      order: ["name"],
    }).then(results => {
      let paints = results.map(item => item.get())
      res.send({ paints })
    })
  }
})

router.get("/:id(\\d+)/attributes", (req, res) => {
  let id = req.params.id

  Paint.findByPk(id).then(paint => {
    if (paint) {
      paint.getAttributes({ order: ["id"] }).then(results => {
        let attributes = results.map(item => {
          item = item.get()
          delete item.PaintsAttributes
          return item
        })
        res.send({ attributes, timestamp: Date.now() })
      })
    } else {
      let error = {
        message: `No paint with id "${id}" found`,
      }

      res.send({ error })
    }
  })
})

module.exports = router
