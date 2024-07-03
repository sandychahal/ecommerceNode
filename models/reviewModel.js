const db = require('../config/database');
const path = require('path');


const addReview=(p_id,u_id, review, rating, updated_by, callback)=>{
    const query = 
    'INSERT INTO reviews (p_id, u_id, review, rating, updated_by) VALUES (?,?,?,?,?)'
    db.query(query, [p_id,u_id, review, rating, updated_by], (err, result)=>{
      if(err){
        return callback(err);
      }
      callback(null, result);
    });
};


const getAllReview = (callback) => {
    db.query('SELECT * FROM reviews', (err, results) => {
      if (err) {
        return callback(err)
      }
      callback(null, results)
    });
};


const deleteReview = (r_id, callback) => {
  const query = 'UPDATE reviews SET is_deleted = 1 WHERE r_id = ?'
  db.query(query, [r_id], (err, result) => {
    if (err) {
      return callback(err)
    }
    callback(null, result)
  });
};


const updateReview = (r_id, review, rating, updated_by, callback) => {
  const query = 'UPDATE reviews SET review = ?, rating = ?, updated_by = ? WHERE r_id = ?'
  db.query(query, [review, rating, updated_by, r_id], (err, result) => {
    if (err) {
      return callback(err)
    }
    callback(null, result)
  });
};


  module.exports = {
    addReview,
    getAllReview,
    deleteReview,
    updateReview
  }