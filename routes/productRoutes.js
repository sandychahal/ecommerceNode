const express = require('express')
const router = express.Router()
const { all, filter, add } = require('../controllers/productsController')
// const authenticateToken = require('../middlewares/authenticateToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/all', all)
router.get('/filter/:id', filter)
router.post('/add',verifyAdmin, add)

module.exports = router
