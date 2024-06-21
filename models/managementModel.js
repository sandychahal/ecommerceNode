// models/managementModel.js
const db = require('../config/database');
const md5 = require('md5');

const findManagementByEmail = (email, callback) => {
  const query = 'SELECT * FROM management WHERE email = ?';
  db.query(query, [email], callback);
};

const findManagementById = (id, callback) => {
  const query = 'SELECT * FROM management WHERE m_id = ?';
  db.query(query, [id], callback);
};

const checkManagementExists = (email, callback) => {
  const query = 'SELECT * FROM management WHERE email = ?';
  db.query(query, [email], callback);
};

const createManagement = (fname, lname, email, passkey, role, callback) => {
  const query = 'INSERT INTO management (fname, lname, email, passkey, role) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [fname, lname, email, md5(passkey), role], callback);
};

const updateManagement = (id, fname, lname, status, role, pfp, email, callback) => {
  const query = 'UPDATE management SET fname = ?, lname = ?, status = ?, role = ?, pfp = ?, email = ? WHERE m_id = ?';
  db.query(query, [fname, lname, status, role, pfp, email, id], callback);
};

module.exports = {
  findManagementByEmail,
  findManagementById,
  checkManagementExists,
  createManagement,
  updateManagement
};
