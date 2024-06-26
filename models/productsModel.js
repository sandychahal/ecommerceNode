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

const addProduct=( name, cat_id, desc, pfp, cp, sp, mrp, created_by, updated_by, callback)=>{
  const query =
    'INSERT INTO products (name,cat_id,`desc`,pfp,cp,sp,mrp, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  db.query(query, [name,cat_id,desc,pfp,cp,sp,mrp, created_by, updated_by], (err,result)=>{
    if(err){
      return callback(err);
    }
    callback(null, result);
  });
};

module.exports = {
  getAllProducts,
  getProductByCategory,
  addProduct,
}
