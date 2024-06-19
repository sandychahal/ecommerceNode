const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/users') // Import user routes
const managementRoutes = require('./routes/management')
const authenticateToken = require('./middlewares/authenticateToken')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware to parse JSON and urlencoded bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Use the user routes for any requests to /users
app.use('/users', userRoutes)
app.use('/management', managementRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
