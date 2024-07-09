const db = require('../config/database');
const path = require('path');


const addInventoryLog=(w_id, p_id, quantity,in_qty, out_qty, created_by, updated_by, callback)=>{
    const query = 
    'INSERT INTO inventory_logs (w_id, p_id, quantity, in_qty, out_qty, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)'
    db.query(query, [w_id, p_id, quantity, in_qty, out_qty, created_by, updated_by], (err, result)=>{
      if(err){
        return callback(err);
      }
      callback(null, result);
    });
};


const getAllInventoryLog = (callback) => {
    db.query('SELECT * FROM inventory_logs', (err, results) => {
      if (err) {
        return callback(err)
      }
      callback(null, results)
    });
};


// update warehouse
const updateInventoryLog = (il_id, w_id, p_id, quantity, in_qty, out_qty, updated_by, callback) => {
    const query = `UPDATE inventory_logs SET w_id = ?, p_id = ?, quantity = ?, in_qty=?, out_qty=?, updated_by = ? WHERE il_id = ?`;
    db.query(query, [w_id, p_id, quantity, in_qty, out_qty, updated_by, il_id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
};


const deleteInventoryLog = (il_id, callback) => {
    const query = 'DELETE FROM inventory_logs WHERE il_id = ?'
    db.query(query, [il_id], (err, result) => {
    if (err) {
      return callback(err)
    }
    callback(null, result)
  });
};

  module.exports = {
    addInventoryLog,
    getAllInventoryLog,
    updateInventoryLog,
    deleteInventoryLog
  }