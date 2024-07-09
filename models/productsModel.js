const db = require('../config/database')


const getAllProducts = (callback) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results)
  })
}

const getProductByCategory = (id, callback) => {
  db.query('SELECT * FROM products WHERE cat_id = ?', [id], (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results)
  })
}

const getUniqueProduct = (id, callback) => {
  db.query('SELECT * FROM products WHERE p_id = ?', [id], (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results)
  })
}

const checkProductExists = (name, callback) => {
  db.query('SELECT * FROM products WHERE name = ?', [name], (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results)
  })
}


// add multer code for pfp in createProduct

const createProduct = (
  name,
  cat_id,
  desc,
  pfp,
  cp,
  sp,
  mrp,
  avg_ratings,
  avg_reviews,
  created_by,
  updated_by,
  callback
) => {
  const query =
    'INSERT INTO products (name, cat_id, `desc`, pfp, cp,sp,mrp,avg_ratings,avg_reviews,created_by,updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  db.query(
    query,
    [
      name,
      cat_id,
      desc,
      pfp,
      cp,
      sp,
      mrp,
      avg_ratings,
      avg_reviews,
      created_by,
      updated_by,
    ],
    callback
  )
}

const addUpdatedProduct = (
  id,
  name,
  cat_id,
  desc,
  pfp,
  cp,
  sp,
  mrp,
  avg_ratings,
  avg_reviews,
  updated_by,
  callback
) => {
  const query =
    'UPDATE products SET name = ?, cat_id = ?, `desc` = ?, pfp = ?, cp = ?, sp = ?, mrp = ?, avg_ratings = ?, avg_reviews = ?, updated_by = ? WHERE p_id = ?'
  db.query(
    query,
    [
      name,
      cat_id,
      desc,
      pfp,
      cp,
      sp,
      mrp,
      avg_ratings,
      avg_reviews,
      updated_by,
      id,
    ],
    callback
  )
}


module.exports = {
  getAllProducts,
  getProductByCategory,
  getUniqueProduct,
  checkProductExists,
  createProduct,
  addUpdatedProduct
}
