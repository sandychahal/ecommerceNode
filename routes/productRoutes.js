const express = require('express')
const router = express.Router()

const { all, filter, filterProduct, addProduct, updateProduct } = require('../controllers/productsController')

// const verifyAdmin = require('../middlewares/verifyAdmin');
// add this middleware while adding product
router.get('/all', all)
router.get('/filter/:id', filter)
router.get('/filterProduct/:id',filterProduct)
router.post('/add',addProduct)
router.post('/update/:id', updateProduct)
module.exports = router

