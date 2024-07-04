const {
  createOrder,
  getOrderitemByOrderId,
  delOrderitem,
} = require('../models/orderModel')

const add = (req, res) => {
  const { o_id, p_id, u_id, quantity, created_by, updated_by } = req.body
  console.log(req.body)

  createOrder(
    o_id,
    p_id,
    u_id,
    quantity,
    created_by,
    updated_by,
    (err, response) => {
      if (err) {
        res.status(500).json({ message: 'Error Adding Order Items' })
      } else {
        res.status(200).json({
          message: 'Order Items added Successfully',
          oi_id: response.insertId,
          o_id,
          p_id,
          u_id,
          quantity,
          created_by,
          updated_by,
        })
      }
    }
  )
}

const getItems = (req, res) => {
  const { o_id } = req.params
  getOrderitemByOrderId(o_id, (err, response) => {
    if (err) {
      res.status(500).json({ message: 'Error Getting Order Items' })
    } else {
      res.status(200).json(response)
    }
  })
}

const del = (req, res) => {
  const oi_id = req.params.oi_id
  delOrderitem(oi_id, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error deleting order items' })
    } else {
      res.json(results)
    }
  })
}

module.exports = {
  add,
  getItems,
  del,
}
