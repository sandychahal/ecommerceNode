// const express = require('express')
// const router = express.Router()
// const db = require('../config/database')
// const md5 = require('md5')
// const jwt = require('jsonwebtoken')
// const authenticateToken = require('../middlewares/authenticateToken')

// router.get('/all', (req, res) => {
//   db.query('SELECT * FROM products', (err, rows) => {
//     if (err) {
//       res.status(500).send({ message: 'Error fetching users' })
//     } else {
//       res.send(rows)
//     }
//   })
// })

// router.get('/filter/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   console.log(req.params)
//   console.log(id)
//   db.query(`SELECT * FROM products WHERE cat_id = ${id}`, (err, rows) => {
//     if (err) {
//       res.status(500).send({ message: 'Error fetching products' })
//     } else {
//       res.send(rows)
//     }
//   })
// })

// module.exports = router

const express = require('express')
const router = express.Router()
const { aLL, filter } = require('../controller/productsController.js')

router.get('/all', aLL)
router.get('/filter/:id', filter)

module.exports = router
