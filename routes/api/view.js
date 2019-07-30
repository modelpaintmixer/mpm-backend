/*
 * Functionality for /api/view
 */

const express = require("express")

const {
  Paint,
  Manufacturer,
  Origin,
  ProductCode,
  Mix,
} = require("../../models")

let router = express.Router()

router.get("/paint/:id", (req, res) => {
  let id = req.params.id
  let paint, standards, attributes

  Paint.findByPk(id, { include: [Manufacturer, Origin, ProductCode] })
    .then(result => {
      paint = result

      return Promise.all([
        paint.getStandards({ order: ["id"] }),
        paint.getAttributes({ order: ["id"] }),
      ])
    })
    .then(results => {
      // eslint-disable-next-line no-extra-semi
      ;[standards, attributes] = results

      paint = paint.get()
      paint.Standards = standards.map(standard => {
        standard = standard.get()
        standard.standardNumber = standard.PaintsStandards.standardNumber
        delete standard.PaintsStandards
        return standard
      })
      paint.Attributes = attributes.map(attr => {
        attr = attr.get()
        delete attr.PaintsAttributes
        return attr
      })

      res.send({ paint: paint, timestamp: Date.now() })
    })
})

router.get("/mix/:id", (req, res) => {
  let id = req.params.id
  let mix, periods, standards, parts

  Mix.findByPk(id, { include: [Origin] })
    .then(result => {
      mix = result

      return Promise.all([
        mix.getPeriods({ order: ["id"] }),
        mix.getStandards({ order: ["id"] }),
        mix.getPaints({ include: [Manufacturer], order: ["id"] }),
      ])
    })
    .then(results => {
      // eslint-disable-next-line no-extra-semi
      ;[periods, standards, parts] = results

      mix = mix.get()
      mix.Standards = standards.map(standard => {
        standard = standard.get()
        standard.standardNumber = standard.MixesStandards.standardNumber
        delete standard.MixesStandards
        return standard
      })
      mix.Periods = periods.map(period => {
        period = period.get()
        delete period.MixesPeriods
        return period
      })
      mix.parts = parts.map(part => {
        part = part.get()
        part.parts = part.MixesPaints.parts
        delete part.MixesPaints
        part.manufacturer = part.Manufacturer.showName
        delete part.Manufacturer
        return part
      })

      res.send({ mix: mix, timestamp: Date.now() })
    })
})

module.exports = router
