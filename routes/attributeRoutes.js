const express = require('express')
const router = express.Router()
const { all, filter, addAttribute, updateAttribute} = require('../controllers/attributeController')

router.get('/all', all)
router.get('/filter', filter)
router.post('/add',addAttribute)
router.post('/update/:id', updateAttribute)

module.exports = router