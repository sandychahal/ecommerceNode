// server.js
const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const managementRoutes = require('./routes/managementRoutes')
const productsRoutes = require('./routes/productRoutes')
const reviewRoutes=require('./routes/reviewRoutes')
const warehouseRoutes=require('./routes/warehouseRoutes')
const inventoryRoutes=require('./routes/inventoryRoutes')
const inventoryLogRoutes=require('./routes/inventoryLogRoutes')


const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', userRoutes);
app.use('/management', managementRoutes);
app.use('/products', productsRoutes);
app.use('/reviews',reviewRoutes);
app.use('/warehouse',warehouseRoutes);
app.use('/inventory',inventoryRoutes);
app.use('/inventorylog',inventoryLogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
