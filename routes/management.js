const express = require('express')
const router = express.Router()
const db = require('../config/database')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const authenticateToken = require('../middlewares/authenticateToken')

const JWT_SECRET = 'your_secret_key'

router.post('/register', (req, res) => {
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
    const hashedPasskey = md5(passkey)

    // Compare the provided passkey with the stored passkey
    if (user.passkey !== hashedPasskey) {
      return res.status(400).json({ error: 'Invalid email or passkey' })
    }

    // Authentication successful, generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    )

    // Return the token and user details
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        mobile: user.mobile,
      },
    })
  })
})

router.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route')
})

module.exports = router
