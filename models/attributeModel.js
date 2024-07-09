const db = require('../config/database')

const getAllAttributes = (callback) => {
  db.query('SELECT * FROM attributes', (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results)
  })
}

// const getProductByCategory = (id, callback) => {
//   db.query('SELECT * FROM products WHERE cat_id = ?', [id], (err, results) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(null, results);
//   });
// };

const getUniqueAttribute =(id,callback)=>{
  db.query('SELECT * FROM attributes WHERE a_id = ?',[id],(err,results)=>{
    if (err) {
      return callback(err);
    }
    callback(null, results);
  })
}

const createAttributes = (p_id, type, value, created_by, updated_by,callback) => {
  const query =
    'INSERT INTO attributes (p_id, type, value, created_by, updated_by) VALUES (?, ?, ?, ?, ?)'
  db.query(query, [p_id, type, value, created_by, updated_by], callback)
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
  getUniqueAttribute,
  createAttributes,
  addUpdatedAttribute,
}
