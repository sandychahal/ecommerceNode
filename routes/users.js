const express = require('express')
const router = express.Router()
const db = require('../config/database')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const authenticateToken = require('../middlewares/authenticateToken')

const JWT_SECRET = 'your_secret_key'

// Create a new user
router.post('/', (req, res) => {
  const { fname, lname, email, passkey, mobile } = req.body

  if (!fname || !lname || !email || !passkey || !mobile) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const query =
    'INSERT INTO users (fname, lname, email, passkey, mobile) VALUES (?, ?, ?, ?, ?)'
  const values = [fname, lname, email, passkey, mobile]

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting user:', err)
      res.status(500).json({ error: 'Internal server error' })
    } else {
      res
        .status(201)
        .json({ id: results.insertId, fname, lname, email, mobile })
    }
  })
})

// // Get all users
// router.get('/', (req, res) => {
//   const query = 'SELECT * FROM users'
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching users:', err)
//       res.status(500).json({ error: 'Internal server error' })
//     } else {
//       res.status(200).json(results)
//     }
//   })
// })

// // Get a user by ID
// router.get('/:id', (req, res) => {
//   const { id } = req.params
//   const query = 'SELECT * FROM users WHERE id = ?'
//   db.query(query, [id], (err, results) => {
//     if (err) {
//       console.error('Error fetching user:', err)
//       res.status(500).json({ error: 'Internal server error' })
//     } else if (results.length === 0) {
//       res.status(404).json({ error: 'User not found' })
//     } else {
//       res.status(200).json(results[0])
//     }
//   })
// })

// // Update a user by ID
// router.put('/:id', (req, res) => {
//   const { id } = req.params
//   const { fname, lname, email, passkey, mobile } = req.body
//   const query =
//     'UPDATE users SET fname = ?, lname = ?, email = ?, passkey = ?, mobile = ? WHERE id = ?'
//   const values = [fname, lname, email, passkey, mobile, id]

//   db.query(query, values, (err, results) => {
//     if (err) {
//       console.error('Error updating user:', err)
//       res.status(500).json({ error: 'Internal server error' })
//     } else {
//       res.status(200).json({ message: 'User updated successfully' })
//     }
//   })
// })

// // Delete a user by ID
// router.delete('/:id', (req, res) => {
//   const { id } = req.params
//   const query = 'DELETE FROM users WHERE id = ?'

//   db.query(query, [id], (err, results) => {
//     if (err) {
//       console.error('Error deleting user:', err)
//       res.status(500).json({ error: 'Internal server error' })
//     } else {
//       res.status(200).json({ message: 'User deleted successfully' })
//     }
//   })
// })

// router.post('/register', (req, res) => {
//   const { fname, lname, email, passkey, mobile } = req.body

//   if (!fname || !lname || !email || !passkey || !mobile) {
//     return res.status(400).json({ error: 'All fields are required' })
//   }

//   const query =
//     'INSERT INTO users (fname, lname, email, passkey, mobile) VALUES (?, ?, ?, ?, ?)'
//   const values = [fname, lname, email, md5(passkey), mobile]

//   db.query(query, values, (err, results) => {
//     if (err) {
//       console.error('Error inserting user:', err)
//       res.status(500).json({ error: 'Internal server error' })
//     } else {
//       res
//         .status(201)
//         .json({ id: results.insertId, fname, lname, email, mobile })
//     }
//   })
// })

// const md5 = require('md5') // Make sure you have md5 library installed

router.post('/register', (req, res) => {
  const { fname, lname, email, passkey, mobile } = req.body

  if (!fname || !lname || !email || !passkey || !mobile) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  // Query to check if email or mobile already exists
  const checkQuery = 'SELECT * FROM users WHERE email = ? OR mobile = ?'
  const checkValues = [email, mobile]

  db.query(checkQuery, checkValues, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking existing user:', checkErr)
      return res.status(500).json({ error: 'Internal server error' })
    }

    if (checkResults.length > 0) {
      return res.status(400).json({ error: 'Email or mobile already exists' })
    }

    // Query to insert a new user
    const insertQuery =
      'INSERT INTO users (fname, lname, email, passkey, mobile) VALUES (?, ?, ?, ?, ?)'
    const insertValues = [fname, lname, email, md5(passkey), mobile]

    db.query(insertQuery, insertValues, (insertErr, insertResults) => {
      if (insertErr) {
        console.error('Error inserting user:', insertErr)
        return res.status(500).json({ error: 'Internal server error' })
      }

      return res
        .status(201)
        .json({ id: insertResults.insertId, fname, lname, email, mobile })
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
  const query = 'SELECT * FROM users WHERE email = ?'


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
