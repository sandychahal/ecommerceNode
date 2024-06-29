// server.js
const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const managementRoutes = require('./routes/managementRoutes')
const productsRoutes = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', userRoutes)
app.use('/management', managementRoutes)
app.use('/products', productsRoutes)
app.use('/category', categoryRoutes)
app.use('/attributes', categoryRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
