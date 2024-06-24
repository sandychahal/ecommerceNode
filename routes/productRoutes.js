const express = require('express')
const router = express.Router()
const { all, filter, filterProduct, addProduct } = require('../controllers/productsController')

router.get('/all', all)
router.get('/filter/:id', filter)
router.get('/filterProduct/:id',filterProduct)
router.post('/add',addProduct)

module.exports = router
