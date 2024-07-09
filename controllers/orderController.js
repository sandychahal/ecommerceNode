const {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  delOrder,
} = require('../models/orderModel')

const create = (req, res) => {
  const {
    u_id,
    fname,
    lname,
    add_l1,
    add_l2,
    city,
    state,
    zip_code,
    country,
    remarks,
    total,
    subtotal,
    tax,
    shipping_cost,
  } = req.body
  console.log(req.body)

  createOrder(
    u_id,
    fname,
    lname,
    add_l1,
    add_l2,
    city,
    state,
    zip_code,
    country,
    remarks,
    total,
    subtotal,
    tax,
    shipping_cost,
    (err, response) => {
      if (err) {
        res.status(500).json({ message: 'Error Creating Order' })
      } else {
        res.status(200).json({
          message: 'Order Created Successfully',
          order_id: response.insertId,
          u_id,
          fname,
          lname,
          add_l1,
          add_l2,
          city,
          state,
          zip_code,
          country,
          remarks,
          total,
          subtotal,
          tax,
          shipping_cost,
        })
      }
    }
  )
}

const filter = (req, res) => {
  const id = req.params.id
  console.log(req.params)
  getOrderById(id, (err, order) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching order' })
    } else {
      res.json(order)
    }
  })
}

const all = (req, res) => {
  const u_id = req.params.u_id
  console.log(req.params)
  getOrdersByUserId(u_id, (err, orders) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching orders' })
    } else {
      res.json(orders)
    }
  })
}

const del = (req, res) => {
  const o_id = req.params.o_id
  delOrder(o_id, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error deleting order' })
    } else {
      res.json(results)
    }
  })
}


module.exports = {
  create,
  filter,
  all,
  del,
}
