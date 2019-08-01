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
  Period,
  Standard,
  Attribute,
} = require("../../models")

let router = express.Router()

router.get("/paint/:id", (req, res) => {
  let id = req.params.id
  let paint

  Paint.findByPk(id, { include: [Manufacturer, Origin, ProductCode] })
    .then(result => {
      paint = result

      return Promise.all([
        paint.getStandards({ order: ["name"] }),
        paint.getAttributes({ order: ["name"] }),
        paint.getMixes({ order: ["name"] }),
      ])
    })
    .then(([standards, attributes, mixes]) => {
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
      paint.Mixes = mixes.map(mix => {
        mix = mix.get()
        mix.parts = mix.MixesPaints.parts
        delete mix.MixesPaints
        return mix
      })

      res.send({ paint: paint, timestamp: Date.now() })
    })
})

router.get("/mix/:id", (req, res) => {
  let id = req.params.id
  let mix

  Mix.findByPk(id, { include: [Origin] })
    .then(result => {
      mix = result

      return Promise.all([
        mix.getPeriods({ order: ["id"] }),
        mix.getStandards({ order: ["id"] }),
        mix.getPaints({ include: [Manufacturer], order: ["id"] }),
      ])
    })
    .then(([periods, standards, parts]) => {
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

router.get("/origin/:id", (req, res) => {
  let id = req.params.id
  let origin

  Origin.findByPk(id)
    .then(result => {
      origin = result

      return Promise.all([
        origin.getPaints({ order: ["id"], include: [Manufacturer] }),
        origin.getMixes({ order: ["id"] }),
        origin.getStandards({ order: ["id"] }),
      ])
    })
    .then(([paints, mixes, standards]) => {
      origin = origin.get()
      origin.Standards = standards.map(standard => {
        standard = standard.get()
        return standard
      })
      origin.Mixes = mixes.map(mix => {
        mix = mix.get()
        return mix
      })
      origin.Paints = paints.map(paint => {
        paint = paint.get()
        paint.manufacturer = paint.Manufacturer.showName
        delete paint.Manufacturer
        return paint
      })

      res.send({ origin: origin, timestamp: Date.now() })
    })
})

router.get("/period/:id", (req, res) => {
  let id = req.params.id
  let period

  Period.findByPk(id)
    .then(result => {
      period = result

      return Promise.all([
        period.getMixes({ order: ["id"] }),
        period.getStandards({ order: ["id"] }),
      ])
    })
    .then(([mixes, standards]) => {
      period = period.get()
      period.Standards = standards.map(standard => {
        standard = standard.get()
        delete standard.PeriodsStandards
        return standard
      })
      period.Mixes = mixes.map(mix => {
        mix = mix.get()
        delete mix.MixesPeriods
        return mix
      })

      res.send({ period: period, timestamp: Date.now() })
    })
})

router.get("/standard/:id", (req, res) => {
  let id = req.params.id
  let standard

  Standard.findByPk(id, { include: [Origin] })
    .then(result => {
      standard = result

      return Promise.all([
        standard.getPeriods({ order: ["id"] }),
        standard.getMixes({ order: ["id"] }),
        standard.getPaints({ order: ["id"], include: [Manufacturer] }),
      ])
    })
    .then(([periods, mixes, paints]) => {
      standard = standard.get()
      standard.Periods = periods.map(period => {
        period = period.get()
        delete period.PeriodsStandards
        return period
      })
      standard.Mixes = mixes.map(mix => {
        mix = mix.get()
        mix.standardNumber = mix.MixesStandards.standardNumber
        delete mix.MixesStandards
        return mix
      })
      standard.Paints = paints.map(paint => {
        paint = paint.get()
        paint.standardNumber = paint.PaintsStandards.standardNumber
        delete paint.PaintsStandards
        paint.manufacturer = paint.Manufacturer.showName
        delete paint.Manufacturer
        return paint
      })

      res.send({ standard: standard, timestamp: Date.now() })
    })
})

router.get("/manufacturer/:id", (req, res) => {
  let id = req.params.id
  let manufacturer

  Manufacturer.findByPk(id, { include: [Origin] })
    .then(result => {
      manufacturer = result

      return Promise.all([
        manufacturer.getManufacturerLocations({
          order: [["isMain", "DESC"], "country"],
        }),
        manufacturer.getPaints({ order: ["id"] }),
      ])
    })
    .then(([locations, paints]) => {
      manufacturer = manufacturer.get()
      manufacturer.ManufacturerLocations = locations.map(location => {
        location = location.get()
        return location
      })
      manufacturer.Paints = paints.map(paint => {
        paint = paint.get()
        return paint
      })

      res.send({ manufacturer: manufacturer, timestamp: Date.now() })
    })
})

router.get("/attribute/:id", (req, res) => {
  let id = req.params.id
  let attribute

  Attribute.findByPk(id)
    .then(result => {
      attribute = result

      return attribute.getPaints({ order: ["id"], include: [Manufacturer] })
    })
    .then(paints => {
      attribute = attribute.get()
      attribute.Paints = paints.map(paint => {
        paint = paint.get()
        paint.manufacturer = paint.Manufacturer.showName
        delete paint.Manufacturer
        delete paint.PaintsAttributes
        return paint
      })

      res.send({ attribute: attribute, timestamp: Date.now() })
    })
})

module.exports = router
