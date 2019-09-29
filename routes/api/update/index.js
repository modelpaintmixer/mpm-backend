/*
 * Root of the routing for /api/update
 */

const express = require("express")
let router = express.Router()

const attribute = require("./attribute")

router.use("/attribute", attribute)

module.exports = router
