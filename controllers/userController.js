// controllers/userController.js
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const {
  findUserByEmail,
  findUserById,
  checkUserExists,
  createUser,
  updateUser,
} = require('../models/userModel')

const JWT_SECRET = 'your_secret_key'

const register = (req, res) => {
  const { fname, lname, email, passkey, mobile } = req.body

  if (!fname || !lname || !email || !passkey || !mobile) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  checkUserExists(email, mobile, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking existing user:', checkErr)
      return res.status(500).json({ error: 'Internal server error' })
    }

    if (checkResults.length > 0) {
      return res.status(400).json({ error: 'Email or mobile already exists' })
    }

    createUser(
      fname,
      lname,
      email,
      passkey,
      mobile,
      (insertErr, insertResults) => {
        if (insertErr) {
          console.error('Error inserting user:', insertErr)
          return res.status(500).json({ error: 'Internal server error' })
        }

        return res.status(201).json({
          id: insertResults.insertId,
          fname,
          lname,
          email,
          mobile,
        })
      }
    )
  })
}

const login = (req, res) => {
  const { email, passkey } = req.body

  if (!email || !passkey) {
    return res.status(400).json({ error: 'Email and passkey are required' })
  }

  findUserByEmail(email, (err, results) => {
    if (err) {
      console.error('Error querying user:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid email or passkey' })
    }

    const user = results[0]
    const hashedPasskey = md5(passkey)

    if (user.passkey !== hashedPasskey) {
      return res.status(400).json({ error: 'Invalid email or passkey' })
    }

    const token = jwt.sign({ id: user.u_id, role: `user` }, JWT_SECRET, {
      expiresIn: '24h',
    })

    return res.status(200).json({
      token,
      user: {
        id: user.u_id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        mobile: user.mobile,
      },
    })
  })
}

const getProfile = (req, res) => {
  const userId = Number(req.user.id)

  findUserById(userId, (err, results) => {
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
}

const updateProfile = (req, res) => {
  const userId = Number(req.user.id)
  const { fname, lname, status, mobile, pfp, email } = req.body

  if (!fname || !lname || !status || !mobile || !pfp || !email) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  updateUser(
    userId,
    fname,
    lname,
    status,
    mobile,
    pfp,
    email,
    (err, results) => {
      if (err) {
        console.error('Error updating user data:', err)
        return res.status(500).json({ error: 'Internal server error' })
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.json({ message: 'Profile updated successfully' })
    }
  )
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
}
