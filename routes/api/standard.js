/*
 * Functionality for /api/standard
 */

const express = require("express")

const { Standard, Sequelize } = require("../../models")
const { like } = Sequelize.Op

let router = express.Router()

router.get("/:id(\\d+)?", (req, res) => {
  let queryOpts = {
    order: ["name"],
    where: {},
  }

  if (req.params.id) {
    queryOpts.where.id = req.params.id
  }
  if (req.query.name) {
    queryOpts.where.name = { [like]: `%${req.query.name}%` }
  }

  Standard.findAll(queryOpts).then(results => {
    let standards = results.map(item => item.get())
    res.send({ standards, timestamp: Date.now() })
  })
})

router.get("/:id(\\d+)/periods", (req, res) => {
  let id = req.params.id

  Standard.findByPk(id).then(standard => {
    if (standard) {
      standard.getPeriods({ order: ["id"] }).then(results => {
        let periods = results.map(item => {
          item = item.get()
          delete item.PeriodsStandards
          return item
        })
        res.send({ periods, timestamp: Date.now() })
      })
    } else {
      let error = {
        message: `No standard with id "${id}" found`,
      }

      res.send({ error })
    }
  })
})

module.exports = router
