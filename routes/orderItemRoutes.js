const express = require('express')
const router = express.Router()
const { add, getItems, del } = require('../controllers/orderItemController')

router.post('/add', add)
router.get('/getitems/:id', getItems)
router.post('/delete', del)
module.exports = router
