/*
 * Functionality for /api/stats
 */

const express = require("express")
const datefns = require("date-fns")

const {
  User,
  Period,
  Standard,
  Paint,
  Manufacturer,
  Color,
  Image,
  NewsItem,
} = require("../../models")

let router = express.Router()

router.get("/site", (req, res) => {
  Promise.all([
    Color.count(),
    Manufacturer.count(),
    Paint.count(),
    Standard.count(),
    Period.count(),
    Image.count(),
  ]).then(values => {
    let stats = {
      colors: values[0],
      manufacturers: values[1],
      paints: values[2],
      standards: values[3],
      periods: values[4],
      images: values[5],
    }

    res.json({ stats })
  })
})

router.get("/changes/:count(\\d+)?", (req, res) => {
  // "+" is necessary to force count to a number for MySQL
  let count = req.params.count ? +req.params.count : 8

  let newsitems = NewsItem.findAll({
    include: [User],
    limit: count,
    order: [["updatedAt", "DESC"], ["createdAt", "DESC"]],
  })
  let colors = Color.findAll({
    include: [User],
    limit: count,
    order: [["updatedAt", "DESC"], "name"],
  })
  let paints = Paint.findAll({
    include: [Manufacturer],
    limit: count,
    order: [["updatedAt", "DESC"], "name"],
  })
  let images = Image.findAll({
    limit: count,
    order: [["updatedAt", "DESC"]],
  })
  let mfrs = Manufacturer.findAll({
    limit: count,
    order: [["updatedAt", "DESC"], "fullName"],
  })

  Promise.all([newsitems, mfrs, colors, images, paints]).then(values => {
    let all = []

    for (let value of values) {
      for (let item of value) {
        let action =
          item.updatedAt.getTime() === item.createdAt.getTime()
            ? "add"
            : "update"
        let type = item.constructor.name
        let obj = {
          type,
          action,
          ...item.get(),
        }
        if (type === "Paint") {
          obj.manufacturer = obj.Manufacturer.name
          delete obj.Manufacturer
        } else if (type === "NewsItem") {
          delete obj.content
          let user = obj.User
          obj.User = {
            id: user.id,
            username: user.username,
            name: user.name,
          }
        } else if (type === "Color") {
          let user = obj.User
          obj.User = {
            id: user.id,
            username: user.username,
            name: user.name,
          }
        }

        all.push(obj)
      }
    }

    all.sort((a, b) => datefns.compareDesc(a.updatedAt, b.updatedAt))
    res.send({ changes: all.slice(0, count) })
  })
})

module.exports = router
