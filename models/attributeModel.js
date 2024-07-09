const db = require('../config/database')

const getAllAttributes = (callback) => {
  db.query('SELECT * FROM attributes', (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results)
  })
}

const getAttributeByType = (type, callback) => {
  db.query('SELECT * FROM attributes WHERE type = ?', [type], (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results)
  })
}


const checkAttributeExists = (value, callback) => {
  db.query('SELECT * FROM attributes WHERE value = ?', [value], (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results)
  })
}

const createAttribute = (
  p_id,
  type,
  value,
  updated_by,
  created_by,
  callback
) => {
  const query =
    'INSERT INTO attributes (p_id, type, value, created_by,updated_by) VALUES (?, ?, ?, ?, ?)'
  db.query(
    query,
    [
      p_id,
      type,
      value,
      created_by,
      updated_by,
    ],
    callback
  )
}

const addUpdatedAttribute = (
  id,
  type,
  value,
  updated_by,
  callback
) => {
  const query =
    'UPDATE attributes SET type = ?, value = ?, updated_by = ? WHERE a_id = ?'
  db.query(
    query,
    [
      type,
      value,
      updated_by,
      id,
    ],
    callback
  )
}

module.exports = {
  getAllAttributes,
  getAttributeByType,
  checkAttributeExists,
  createAttribute,
  addUpdatedAttribute,
}
