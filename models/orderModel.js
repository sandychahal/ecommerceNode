const db = require('../config/database')

const createOrder = (
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
  callback
) => {
  const query =
    'INSERT INTO orders (u_id, fname, lname, add_l1, add_l2, city, state,zip_code, country, remarks, total, subtotal, tax, shipping_cost) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

  db.query(
    query,
    [
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
    ],
    (err, results) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, results)
      }
    }
  )
}

const getOrderById = (id, callback) => {
  const query = 'SELECT * FROM orders WHERE o_id=?'
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

const getOrdersByUserId = (u_id, callback) => {
  const query = 'SELECT * FROM orders WHERE u_id=?'
  db.query(query, [u_id], (err, results) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

const delOrder = (o_id, callback) => {
  const query = `UPDATE orders SET is_deleted=?  WHERE o_id=?`
  db.query(query, [1, o_id], (err, results) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  delOrder
}
