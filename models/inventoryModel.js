const db = require('../config/database');
const path = require('path');


const addInventory=(w_id, p_id, quantity, created_by, updated_by, callback)=>{
    const query = 
    'INSERT INTO inventory (w_id, p_id, quantity, created_by, updated_by) VALUES (?,?,?,?,?)'
    db.query(query, [w_id, p_id, quantity, created_by, updated_by], (err, result)=>{
      if(err){
        return callback(err);
      }
      callback(null, result);
    });
};


const getAllInventory = (callback) => {
    db.query('SELECT * FROM inventory', (err, results) => {
      if (err) {
        return callback(err)
      }
      callback(null, results)
    });
};


// update warehouse
const updateInventory = (i_id, w_id, p_id, quantity, updated_by, callback) => {
    const query = `UPDATE inventory SET w_id = ?, p_id = ?, quantity = ?, updated_by = ? WHERE i_id = ?`;
    db.query(query, [w_id, p_id, quantity, updated_by, i_id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
};


const deleteInventory = (i_id, callback) => {
    const query = 'DELETE FROM inventory WHERE i_id = ?'
    db.query(query, [i_id], (err, result) => {
    if (err) {
      return callback(err)
    }
    callback(null, result)
  });
};

  module.exports = {
    addInventory,
    getAllInventory,
    updateInventory,
    deleteInventory
  }