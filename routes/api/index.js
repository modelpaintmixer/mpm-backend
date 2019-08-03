/*
 * Root of the routing for /api
 */

const express = require("express")
const cors = require("cors")
const stats = require("./stats")
const paint = require("./paint")
const manufacturer = require("./manufacturer")
const attribute = require("./attribute")
const color = require("./color")
const view = require("./view")

let router = express.Router()
router.use(cors())

router.use("/stats", stats)
router.use("/paint", paint)
router.use("/manufacturer", manufacturer)
router.use("/attribute", attribute)
router.use("/color", color)
router.use("/view", view)

module.exports = router
