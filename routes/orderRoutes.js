const express = require('express')
const router = express.Router()
const {
  create,
  filter,
  all,
  del,
} = require('../controllers/orderController')

router.post('/create', create)
router.get('/filter/:id', filter)
router.get('/all/:u_id',all)
router.post('/delete/:o_id', del)
module.exports = router
