/*
 * Root of the routing for /api
 */

const express = require("express")
const cors = require("cors")

const sitecookie = require("./sitecookie")
const stats = require("./stats")
const paint = require("./paint")
const manufacturer = require("./manufacturer")
const attribute = require("./attribute")
const color = require("./color")
const period = require("./period")
const standard = require("./standard")
const origin = require("./origin")
const view = require("./view")
const topn = require("./topn")

let router = express.Router()
router.use(cors())

router.use("/sitecookie", sitecookie)
router.use("/stats", stats)
router.use("/paint", paint)
router.use("/manufacturer", manufacturer)
router.use("/attribute", attribute)
router.use("/color", color)
router.use("/period", period)
router.use("/standard", standard)
router.use("/origin", origin)
router.use("/view", view)
router.use("/topn", topn)

module.exports = router
