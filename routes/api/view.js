/*
 * Functionality for /api/view
 */

const express = require("express")

const {
  Paint,
  Manufacturer,
  Origin,
  ProductCode,
  Color,
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
        paint.getColors({ order: ["name"] }),
      ])
    })
    .then(([standards, attributes, colors]) => {
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
      paint.Colors = colors.map(color => {
        color = color.get()
        color.parts = color.ColorsPaints.parts
        delete color.ColorsPaints
        return color
      })

      res.send({ paint: paint, timestamp: Date.now() })
    })
})

router.get("/color/:id", (req, res) => {
  let id = req.params.id
  let color

  Color.findByPk(id, { include: [Origin] })
    .then(result => {
      color = result

      return Promise.all([
        color.getPeriods({ order: ["id"] }),
        color.getStandards({ order: ["id"] }),
        color.getPaints({ include: [Manufacturer], order: ["id"] }),
      ])
    })
    .then(([periods, standards, parts]) => {
      color = color.get()
      color.Standards = standards.map(standard => {
        standard = standard.get()
        standard.standardNumber = standard.ColorsStandards.standardNumber
        delete standard.ColorsStandards
        return standard
      })
      color.Periods = periods.map(period => {
        period = period.get()
        delete period.ColorsPeriods
        return period
      })
      color.parts = parts.map(part => {
        part = part.get()
        part.parts = part.ColorsPaints.parts
        delete part.ColorsPaints
        part.manufacturer = part.Manufacturer.name
        delete part.Manufacturer
        return part
      })

      res.send({ color: color, timestamp: Date.now() })
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
        origin.getColors({ order: ["id"] }),
        origin.getStandards({ order: ["id"] }),
      ])
    })
    .then(([paints, colors, standards]) => {
      origin = origin.get()
      origin.Standards = standards.map(standard => {
        standard = standard.get()
        return standard
      })
      origin.Colors = colors.map(color => {
        color = color.get()
        return color
      })
      origin.Paints = paints.map(paint => {
        paint = paint.get()
        paint.manufacturer = paint.Manufacturer.name
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
        period.getColors({ order: ["id"] }),
        period.getStandards({ order: ["id"] }),
      ])
    })
    .then(([colors, standards]) => {
      period = period.get()
      period.Standards = standards.map(standard => {
        standard = standard.get()
        delete standard.PeriodsStandards
        return standard
      })
      period.Colors = colors.map(color => {
        color = color.get()
        delete color.ColorsPeriods
        return color
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
        standard.getColors({ order: ["id"] }),
        standard.getPaints({ order: ["id"], include: [Manufacturer] }),
      ])
    })
    .then(([periods, colors, paints]) => {
      standard = standard.get()
      standard.Periods = periods.map(period => {
        period = period.get()
        delete period.PeriodsStandards
        return period
      })
      standard.Colors = colors.map(color => {
        color = color.get()
        color.standardNumber = color.ColorsStandards.standardNumber
        delete color.ColorsStandards
        return color
      })
      standard.Paints = paints.map(paint => {
        paint = paint.get()
        paint.standardNumber = paint.PaintsStandards.standardNumber
        delete paint.PaintsStandards
        paint.manufacturer = paint.Manufacturer.name
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
        paint.manufacturer = paint.Manufacturer.name
        delete paint.Manufacturer
        delete paint.PaintsAttributes
        return paint
      })

      res.send({ attribute: attribute, timestamp: Date.now() })
    })
})

module.exports = router
