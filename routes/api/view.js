/*
 * Functionality for /api/view
 */

const express = require("express")

const {
  User,
  Paint,
  Manufacturer,
  Origin,
  ProductCode,
  Color,
  Period,
  Standard,
  Attribute,
  sequelize,
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

      res.send({ paint })
    })
})

router.get("/color/:id", (req, res) => {
  let id = req.params.id
  let color

  Color.findByPk(id, { include: [Origin, User] })
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

      res.send({ color })
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

      res.send({ origin })
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

      res.send({ period })
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

      res.send({ standard })
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

      res.send({ manufacturer })
    })
})

router.get("/manufacturers", (req, res) => {
  let query = `
    SELECT m.id                 AS id,
          m.name               AS name,
          m.fullName           AS fullName,
          m.notes              AS notes,
          o.name               AS origin,
          COALESCE(p_count, 0) AS paint_count
    FROM   Manufacturers m
          LEFT JOIN Origins o ON m.originId = o.id
          LEFT OUTER JOIN (SELECT manufacturerId,
                    COUNT(*) AS p_count
                            FROM   Paints
                            GROUP  BY manufacturerId) AS p
                        ON p.manufacturerId = m.id
    ORDER BY m.fullName
  `
  let options = {
    type: sequelize.QueryTypes.SELECT,
  }

  sequelize.query(query, options).then(manufacturers => {
    res.send({ manufacturers })
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

      res.send({ attribute })
    })
})

router.get("/attributes", (req, res) => {
  let query = `
    SELECT a.id                 AS id,
           a.name               AS name,
           a.description        AS description,
           COALESCE(p_count, 0) AS paint_count
    FROM   Attributes a
           LEFT OUTER JOIN (SELECT attributeId,
                                   COUNT(*) AS p_count
                            FROM   PaintsAttributes
                            GROUP  BY attributeId) as pa
                        ON pa.attributeId = a.id
    ORDER BY name
  `
  let options = {
    type: sequelize.QueryTypes.SELECT,
  }

  sequelize.query(query, options).then(attributes => {
    res.send({ attributes })
  })
})

router.get("/user/:id", (req, res) => {
  let id = req.params.id
  let query = { include: [Color], where: {} }
  let user

  if (id.match(/^\d+/)) {
    query.where.id = id
  } else {
    query.where.username = id
  }

  User.findOne(query).then(result => {
    user = result.get()

    res.send({ user })
  })
})

module.exports = router
