/*
 * Functionality for /api/color
 */

const express = require("express")

const { Color, Origin, Sequelize } = require("../../models")
const { like } = Sequelize.Op

let router = express.Router()

router.get("/:id(\\d+)?", (req, res) => {
  let queryOpts = {
    include: [Origin],
    order: ["name"],
    where: {},
  }

  if (req.params.id) {
    queryOpts.where.id = req.params.id
  }
  if (req.query.name) {
    queryOpts.where.name = { [like]: `%${req.query.name}%` }
  }

  Color.findAll(queryOpts).then(results => {
    let colors = results.map(item => item.get())
    res.send({ colors: colors, timestamp: Date.now() })
  })
})

router.get("/:id/periods", (req, res) => {
  let id = req.params.id

  Color.findByPk(id).then(color => {
    color.getPeriods({ order: ["id"] }).then(results => {
      let periods = results.map(item => {
        item = item.get()
        delete item.ColorsPeriods
        return item
      })
      res.send({ periods: periods, timestamp: Date.now() })
    })
  })
})

router.get("/:id/standards", (req, res) => {
  let id = req.params.id

  Color.findByPk(id).then(color => {
    color.getStandards({ order: ["id"] }).then(results => {
      let standards = results.map(item => {
        item = item.get()
        delete item.PeriodsStandards
        return item
      })
      res.send({ standards: standards, timestamp: Date.now() })
    })
  })
})

router.get("/:id/parts", (req, res) => {
  let id = req.params.id

  Color.findByPk(id).then(color => {
    color.getPaints({ order: ["id"] }).then(results => {
      let parts = results.map(part => {
        part = part.get()
        part.parts = part.ColorsPaints.parts
        delete part.ColorsPaints
        return part
      })
      res.send({ parts: parts, timestamp: Date.now() })
    })
  })
})

module.exports = router
