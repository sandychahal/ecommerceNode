const express =require('express')
const { addAttribute, all, filter, updateAttribute } = require('../controllers/attributeController')
const router = express.Router()

router.get('/all', all)
router.get('/filter/:id', filter)
router.post('/add',addAttribute)
router.post('/update/:id', updateAttribute)

module.exports =router