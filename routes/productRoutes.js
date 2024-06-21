const express = require('express')
const router = express.Router()
const { aLL, filter } = require('../controller/productsController.js')

router.get('/all', aLL)
router.get('/filter/:id', filter)

module.exports = router
