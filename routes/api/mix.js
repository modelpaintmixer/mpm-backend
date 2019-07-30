/*
 * Functionality for /api/mix
 */

const express = require("express")

const { Mix, Origin, Sequelize } = require("../../models")
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

  Mix.findAll(queryOpts).then(results => {
    let mixes = results.map(item => item.get())
    res.send({ mixes: mixes, timestamp: Date.now() })
  })
})

router.get("/:id/periods", (req, res) => {
  let id = req.params.id

  Mix.findByPk(id).then(mix => {
    mix.getPeriods({ order: ["id"] }).then(results => {
      let periods = results.map(item => {
        item = item.get()
        delete item.MixesPeriods
        return item
      })
      res.send({ periods: periods, timestamp: Date.now() })
    })
  })
})

router.get("/:id/standards", (req, res) => {
  let id = req.params.id

  Mix.findByPk(id).then(mix => {
    mix.getStandards({ order: ["id"] }).then(results => {
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

  Mix.findByPk(id).then(mix => {
    mix.getPaints({ order: ["id"] }).then(results => {
      let parts = results.map(part => {
        part = part.get()
        part.parts = part.MixesPaints.parts
        delete part.MixesPaints
        return part
      })
      res.send({ parts: parts, timestamp: Date.now() })
    })
  })
})

module.exports = router
