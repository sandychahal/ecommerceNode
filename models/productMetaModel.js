const db = require('../config/database')

const getAllProductMeta = (callback) => {
  db.query('SELECT * FROM productmeta', (err, results) => {
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

const getUniqueProductMeta =(id,callback)=>{
  db.query('SELECT * FROM productmeta WHERE pm_id = ?',[id],(err,results)=>{
    if (err) {
      return callback(err);
    }
    callback(null, results);
  })
}

const createProductMeta = (p_id, m_key, m_value, created_by, updated_by,callback) => {
  const query =
    'INSERT INTO productmeta (p_id, m_key, m_value, created_by, updated_by) VALUES (?, ?, ?, ?, ?)'
  db.query(query, [p_id, m_key, m_value, created_by, updated_by], callback)
}

const addUpdatedProductMeta = (
  id,
  m_key,
  m_value,
  updated_by,
  callback
) => {
  const query =
    'UPDATE productmeta SET m_key = ?, m_value = ?, updated_by = ? WHERE pm_id = ?'
  db.query(
    query,
    [
      m_key,
      m_value,
      updated_by,
      id,
    ],
    callback
  )
}


module.exports = {
  getAllProductMeta,
  getUniqueProductMeta,
  createProductMeta,
  addUpdatedProductMeta,
}
