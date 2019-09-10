/*
 * Functionality for /api/color
 */

const express = require("express")

const { Color, Origin } = require("../../models")

let router = express.Router()

router.get("/:id?", (req, res) => {
  if (req.params.id) {
    let id = req.params.id

    if (id.match(/^\d+$/)) {
      Color.findByPk(id, { include: [Origin] }).then(result => {
        if (result) {
          res.send({ color: result.get() })
        } else {
          let error = { message: `No color with id "${id}" found` }
          res.send({ error })
        }
      })
    } else {
      Color.findOne({ include: [Origin], where: { name: id } }).then(result => {
        if (result) {
          res.send({ color: result.get() })
        } else {
          let error = { message: `No color with name "${id}" found` }
          res.send({ error })
        }
      })
    }
  } else {
    Color.findAll({ include: [Origin], order: ["name"] }).then(results => {
      let colors = results.map(item => item.get())
      res.send({ colors })
    })
  }
})

router.get("/:id(\\d+)/periods", (req, res) => {
  let id = req.params.id

  Color.findByPk(id).then(color => {
    if (color) {
      color.getPeriods({ order: ["id"] }).then(results => {
        let periods = results.map(item => {
          item = item.get()
          delete item.ColorsPeriods
          return item
        })
        res.send({ periods })
      })
    } else {
      let error = {
        message: `No color with id "${id}" found`,
      }

      res.send({ error })
    }
  })
})

router.get("/:id(\\d+)/standards", (req, res) => {
  let id = req.params.id

  Color.findByPk(id).then(color => {
    if (color) {
      color.getStandards({ order: ["id"] }).then(results => {
        let standards = results.map(item => {
          item = item.get()
          delete item.PeriodsStandards
          return item
        })
        res.send({ standards })
      })
    } else {
      let error = {
        message: `No color with id "${id}" found`,
      }

      res.send({ error })
    }
  })
})

router.get("/:id(\\d+)/parts", (req, res) => {
  let id = req.params.id

  Color.findByPk(id).then(color => {
    if (color) {
      color.getPaints({ order: ["id"] }).then(results => {
        let parts = results.map(part => {
          part = part.get()
          part.parts = part.ColorsPaints.parts
          delete part.ColorsPaints
          return part
        })
        res.send({ parts })
      })
    } else {
      let error = {
        message: `No color with id "${id}" found`,
      }

      res.send({ error })
    }
  })
})

module.exports = router
