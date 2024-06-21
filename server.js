const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/users') 
const managementRoutes = require('./routes/management')
const productsRoutes = require('./routes/products')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware to parse JSON and urlencoded bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Use the user routes for any requests to /users
app.use('/users', userRoutes)
app.use('/management', managementRoutes)
app.use("/products", productsRoutes)
// app.use('/products', productsRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
