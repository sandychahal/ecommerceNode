const express = require('express')
const router = express.Router()
const db = require('../config/database')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const authenticateToken = require('../middlewares/authenticateToken')
const verifyEmail = require('../middlewares/verifyEmail')

const JWT_SECRET = 'your_secret_key'

router.post('/register', verifyEmail, (req, res) => {
  const { fname, lname, email, passkey, role } = req.body

  if (!fname || !lname || !email || !passkey || !role) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  // Query to check if email or mobile already exists
  const checkQuery = 'SELECT * FROM management WHERE email = ?'
  const checkValues = [email]

  db.query(checkQuery, checkValues, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking existing user:', checkErr)
      return res.status(500).json({ error: 'Internal server error' })
    }

    if (checkResults.length > 0) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    // Query to insert a new user
    const insertQuery =
      'INSERT INTO management (fname, lname, email, passkey, role) VALUES (?, ?, ?, ?, ?)'
    const insertValues = [fname, lname, email, md5(passkey), role]

    db.query(insertQuery, insertValues, (insertErr, insertResults) => {
      if (insertErr) {
        console.error('Error inserting user:', insertErr)
        return res.status(500).json({ error: 'Internal server error' })
      }

      return res
        .status(201)
        .json({ id: insertResults.insertId, fname, lname, email, role })
    })
  })
})

router.post('/login', (req, res) => {
  const { email, passkey } = req.body

  // Check if email and passkey are provided
  if (!email || !passkey) {
    return res.status(400).json({ error: 'Email and passkey are required' })
  }

  // Query to find the user by email
  const query = 'SELECT * FROM management WHERE email = ?'

  db.query(query, email, (err, results) => {
    if (err) {
      console.error('Error querying user:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid email or passkey' })
    }
    // console.log(results)
    const user = results[0]
    console.log(user)
    const hashedPasskey = md5(passkey)

    // Compare the provided passkey with the stored passkey
    if (user.passkey !== hashedPasskey) {
      return res.status(400).json({ error: 'Invalid email or passkey' })
    }

    // Authentication successful, generate a JWT token
    const token = jwt.sign(
      { id: user.m_id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    )

    // Return the token and user details
    return res.status(200).json({
      token,
      user: {
        id: user.m_id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        mobile: user.mobile,
        picture: user.pfp,
        role: user.role
      },
    })
  })
})

router.get('/profile', authenticateToken, (req, res) => {
  const userId = Number(req.user.id, 10)

  // Query to get user data from the management table
  const query =
    'SELECT m_id, fname, lname, email, status, role, pfp FROM management WHERE m_id = ?'

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error querying user data:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = results[0]
    res.json(user)
  })
})

router.put('/profile', authenticateToken, (req, res) => {
  const userId = Number(req.user.id);
  const { fname, lname, status, role, pfp , email} = req.body

  // Validate incoming data
  if (!fname || !lname || !status || !role || !pfp || !email) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const query = `
    UPDATE management 
    SET fname = ?, lname = ?, status = ?, role = ?, pfp = ?, email = ?
    WHERE m_id = ?
  `

  db.query(query, [fname, lname, status, role, pfp, email, userId], (err, results) => {
    if (err) {
      console.error('Error updating user data:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ message: 'Profile updated successfully' })
  })
})



module.exports = router
