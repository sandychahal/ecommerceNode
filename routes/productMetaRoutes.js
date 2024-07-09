const express =require('express')
const { all, filter, addProductMeta, updateProductMeta } = require('../controllers/productMetaController')
const router = express.Router()

router.get('/all', all)
router.get('/filter/:id', filter)
router.post('/add',addProductMeta)
router.post('/update/:id', updateProductMeta)

module.exports =router