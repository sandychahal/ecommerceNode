const express = require('express')
const router = express.Router()
const { all, filter, add } = require('../controllers/productsController')
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/all', all)
router.get('/filter/:id', filter)
router.post('/add',authenticateToken, add)

module.exports = router
