/*
 * Functionality for /api/standard
 */

const express = require("express")

const { Standard } = require("../../models")

let router = express.Router()

router.get("/:id?", (req, res) => {
  if (req.params.id) {
    let id = req.params.id

    if (id.match(/^\d+$/)) {
      Standard.findByPk(id).then(result => {
        if (result) {
          res.send({ standard: result.get() })
        } else {
          let error = { message: `No standard with id "${id}" found` }
          res.send({ error })
        }
      })
    } else {
      Standard.findOne({ where: { name: id } }).then(result => {
        if (result) {
          res.send({ standard: result.get() })
        } else {
          let error = { message: `No standard with name "${id}" found` }
          res.send({ error })
        }
      })
    }
  } else {
    Standard.findAll({ order: ["name"] }).then(results => {
      let standards = results.map(item => item.get())
      res.send({ standards })
    })
  }
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
