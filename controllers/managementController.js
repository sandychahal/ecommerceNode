// controllers/managementController.js
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const {
  findManagementByEmail,
  findManagementById,
  checkManagementExists,
  createManagement,
  updateManagement
} = require('../models/managementModel');

const JWT_SECRET = 'your_secret_key';

const register = (req, res) => {
  const { fname, lname, email, passkey, role } = req.body;

  if (!fname || !lname || !email || !passkey || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  checkManagementExists(email, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking existing user:', checkErr);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (checkResults.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    createManagement(fname, lname, email, passkey, role, (insertErr, insertResults) => {
      if (insertErr) {
        console.error('Error inserting user:', insertErr);
        return res.status(500).json({ error: 'Internal server error' });
      }

      return res.status(201).json({
        id: insertResults.insertId,
        fname,
        lname,
        email,
        role
      });
    });
  });
};

const login = (req, res) => {
  const { email, passkey } = req.body;

  if (!email || !passkey) {
    return res.status(400).json({ error: 'Email and passkey are required' });
  }

  findManagementByEmail(email, (err, results) => {
    if (err) {
      console.error('Error querying user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid email or passkey' });
    }

    const user = results[0];
    const hashedPasskey = md5(passkey);

    if (user.passkey !== hashedPasskey) {
      return res.status(400).json({ error: 'Invalid email or passkey' });
    }

    const token = jwt.sign({ id: user.m_id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      token,
      user: {
        id: user.m_id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
        pfp: user.pfp
      }
    });
  });
};

const getProfile = (req, res) => {
  const userId = Number(req.user.id);

  findManagementById(userId, (err, results) => {
    if (err) {
      console.error('Error querying user data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];
    res.json(user);
  });
};

const updateProfile = (req, res) => {
  const userId = Number(req.user.id);
  const { fname, lname, status, role, pfp, email } = req.body;

  if (!fname || !lname || !status || !role || !pfp || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  updateManagement(userId, fname, lname, status, role, pfp, email, (err, results) => {
    if (err) {
      console.error('Error updating user data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  });
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
