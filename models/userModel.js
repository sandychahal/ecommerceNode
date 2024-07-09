// models/userModel.js
const db = require('../config/database')
const md5 = require('md5')

const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?'
  db.query(query, [email], callback)
}

const findUserById = (id, callback) => {
  const query = 'SELECT * FROM users WHERE u_id = ?'
  db.query(query, [id], callback)
}

const checkUserExists = (email, mobile, callback) => {
  const query = 'SELECT * FROM users WHERE email = ? OR mobile = ?'
  db.query(query, [email, mobile], callback)
}


const createUser = (fname, lname, email, passkey, mobile, profilePicture, callback) => {
  const sql = 'INSERT INTO users (fname, lname, email, passkey, mobile, pfp) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [fname, lname, email, passkey, mobile, profilePicture];
  
  db.query(sql, values, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};



const updateUser = (id, fname, lname, status, mobile, pfp, email, callback) => {
  const query =
    'UPDATE users SET fname = ?, lname = ?, status = ?, mobile = ?, pfp = ?, email = ? WHERE u_id = ?'
  db.query(query, [fname, lname, status, mobile, pfp, email, id], callback)
}

module.exports = {
  findUserByEmail,
  findUserById,
  checkUserExists,
  createUser,
  updateUser,
}
