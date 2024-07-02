const express = require('express')
const router = express.Router()
const { all, filter, add, reviewAdd } = require('../controllers/productsController')
// const authenticateToken = require('../middlewares/authenticateToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/all', all)
router.get('/filter/:id', filter)
router.post('/add',verifyAdmin, add)
router.post('/review',reviewAdd);

module.exports = router
