const { getAllProducts } = require('../models/productsModel')
const { getProductByCategory } = require('../models/productsModel')

const all = (req, res) => {
  getAllProducts((err, products) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching products' })
    } else {
      res.json(products)
    }
  })
}

const filter = (req, res) => {
  const id = req.params.id // Assuming id is passed as a query parameter
  console.log(req.params)
  getProductByCategory(id, (err, products) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching products' })
    } else {
      res.json(products)
    }
  })
}

module.exports = {
  all,
  filter,
}
