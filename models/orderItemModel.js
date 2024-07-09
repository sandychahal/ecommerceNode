const db = require('../config/database')

const createOrder = (
  o_id,
    p_id,
    u_id,
    quantity,
    created_by,
    updated_by,
  callback
) => {
  const query =
    'INSERT INTO order_items (o_id, p_id, u_id, quantity, created_by, updated_by ) VALUES (?,?,?,?,?,?)'

  db.query(
    query,
    [
      o_id,
    p_id,
    u_id,
    quantity,
    created_by,
    updated_by,
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


const getOrderitemByOrderId = (o_id, callback) => {
  const query = 'SELECT products.p_id, products.name, order_items.quantity FROM products JOIN order_items ON products.p_id = order_items.p_id WHERE order_items.o_id = ?;'
  db.query(query, [o_id], (err, results) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

const delOrder = (oi_id, callback) => {
  const query = `UPDATE order_items SET is_deleted=?  WHERE oi_id=?`
  db.query(query, [1, oi_id], (err, results) => {
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
  getOrderitemByOrderId,
  delOrder
}
