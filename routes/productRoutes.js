const express = require('express')
const router = express.Router()
const { all, filter } = require('../controllers/productsController')

router.get('/all', all)
router.get('/filter/:id', filter)

module.exports = router
