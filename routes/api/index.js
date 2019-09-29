/*
 * Root of the routing for /api
 */

const express = require("express")
const cors = require("cors")

const sitecookie = require("./sitecookie")
const paint = require("./paint")
const manufacturer = require("./manufacturer")
const attribute = require("./attribute")
const color = require("./color")
const period = require("./period")
const standard = require("./standard")
const origin = require("./origin")
const newsitem = require("./newsitem")

const stats = require("./stats")
const view = require("./view")
const topn = require("./topn")
const minimal = require("./minimal")

const update = require("./update")

let router = express.Router()
router.use(cors())

router.use("/sitecookie", sitecookie)
router.use("/paint", paint)
router.use("/manufacturer", manufacturer)
router.use("/attribute", attribute)
router.use("/color", color)
router.use("/period", period)
router.use("/standard", standard)
router.use("/origin", origin)
router.use("/newsitem", newsitem)

router.use("/stats", stats)
router.use("/view", view)
router.use("/topn", topn)
router.use("/minimal", minimal)

router.use("/update", update)

module.exports = router
