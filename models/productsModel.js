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
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  getAllProducts,
  getProductByCategory,
}
