const db = require('../config/database')

const getAllCategories = (callback) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results)
  })
}

const getCategoryById = (id, callback) => {
  db.query('SELECT * FROM categories WHERE cat_id = ?', [id], (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results)
  })
}


const checkCategoryExists = (name, callback) => {
  db.query('SELECT * FROM categories WHERE name = ?', [name], (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results)
  })
}

const createCategory = (
  name,
  parent,
  created_by,
  updated_by,
  callback
) => {
  const query =
    'INSERT INTO categories (name, parent,created_by,updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  db.query(
    query,
    [
      name,
      parent,
      created_by,
      updated_by,
    ],
    callback
  )
}

const addUpdatedCategory = (
  id,
  name,
  parent,
  updated_by,
  callback
) => {
  const query =
    'UPDATE categories SET name = ?, parent = ?, updated_by = ? WHERE cat_id = ?'
  db.query(
    query,
    [
      name,
      parent,
      updated_by,
      id,
    ],
    callback
  )
}

module.exports = {
  getAllCategories,
  getCategoryById,
  checkCategoryExists,
  createCategory,
  addUpdatedCategory,
}
