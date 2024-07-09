const express = require('express')
const router = express.Router()
const { all, filter, addCategory, updateCategory } = require('../controllers/categoryController')

router.get('/all', all)
router.get('/filter/:id', filter)
router.post('/add',addCategory)
router.post('/update/:id', updateCategory)
module.exports = router