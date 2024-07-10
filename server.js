// server.js
const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const managementRoutes = require('./routes/managementRoutes')
const productsRoutes = require('./routes/productRoutes')
const productMetaRoutes = require('./routes/productMetaRoutes')

const reviewRoutes=require('./routes/reviewRoutes')
const warehouseRoutes=require('./routes/warehouseRoutes')
const inventoryRoutes=require('./routes/inventoryRoutes')
const inventoryLogRoutes=require('./routes/inventoryLogRoutes')


const categoryRoutes = require('./routes/categoryRoutes')
const attributeRoutes = require('./routes/attributeRoutes')
const orderRoutes = require('./routes/orderRoutes')
const orderItemRoutes = require('./routes/orderItemRoutes')
const path = require('path')


const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))




app.use('/reviews',reviewRoutes);
app.use('/warehouse',warehouseRoutes);
app.use('/inventory',inventoryRoutes);
app.use('/inventorylog',inventoryLogRoutes);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/users', userRoutes)
app.use('/management', managementRoutes)
app.use('/products', productsRoutes)
app.use('/category', categoryRoutes)
app.use('/productMeta',productMetaRoutes)
app.use('/attributes', attributeRoutes)
app.use('/orders', orderRoutes)
// app.use('/order-items', orderItemRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
