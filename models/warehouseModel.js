const db = require('../config/database');
const path = require('path');


const addWarehouse=(w_name, address, city, state, zipcode, country, mobile, manager, callback)=>{
    const query = 
    'INSERT INTO warehouses (w_name, address, city, state, zipcode, country, mobile, manager) VALUES (?,?,?,?,?,?,?,?)'
    db.query(query, [w_name, address, city, state, zipcode, country, mobile, manager], (err, result)=>{
      if(err){
        return callback(err);
      }
      callback(null, result);
    });
};


const getAllWarehouse = (callback) => {
    db.query('SELECT * FROM warehouses', (err, results) => {
      if (err) {
        return callback(err)
      }
      callback(null, results)
    });
};


// update warehouse
const updateWarehouse = (w_id, w_name, address, city, state, zipcode, country, mobile, manager, callback) => {
    const query = `UPDATE warehouses SET w_name = ?, address = ?, city = ?, state = ?, zipcode = ?, country = ?, mobile = ?, manager = ? WHERE w_id = ?`;
    db.query(query, [w_name, address, city, state, zipcode, country, mobile, manager, w_id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
};


const deleteWarehouse = (w_id, callback) => {
    const query = 'DELETE FROM warehouses WHERE w_id = ?';
  db.query(query, [w_id], (err, result) => {
    if (err) {
      return callback(err)
    }
    callback(null, result)
  });
};

  module.exports = {
    addWarehouse,
    getAllWarehouse,
    updateWarehouse,
    deleteWarehouse
    // deleteReview
  }