const { getProductByCategory,checkProductExists,createProduct, getAllProducts, getUniqueProduct } = require('../models/productsModel')

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

const filterProduct = (req, res) => {
  const id = req.params.id 
  console.log(req.params)
  getUniqueProduct(id, (err, products) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching products' })
    } else {
      if(products.length==0){
        return res.status(404).json({message:'Product not found'});
      }
      res.json(products)
    }
  })
}

const addProduct = (req, res) => {
  const { name, cat_id, desc, pfp, cp,sp,mrp,avg_ratings,avg_reviews,created_by,updated_by } = req.body

  if (!name || !cat_id || !desc || !pfp || !cp || !sp || !mrp || !avg_ratings || !avg_reviews) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  checkProductExists(name, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking existing user:', checkErr)
      return res.status(500).json({ error: 'Internal server error' })
    }

    if (checkResults.length > 0) {
      return res.status(400).json({ error: 'Product already exists' })
    }

    createProduct(
      name,
      cat_id,
      desc,
      pfp,
      cp,
      sp,
      mrp,
      avg_ratings,
      avg_reviews,
      created_by,
      updated_by,
      (insertErr, insertResults) => {
        if (insertErr) {
          console.error('Error inserting user:', insertErr)
          return res.status(500).json({ error: 'Internal server error' })
        }

        return res.status(201).json({
          id: insertResults.insertId,
          name,
          cat_id,
          desc,
        })
      }
    )
  })
}


module.exports = {
  all,
  filter,
  filterProduct,
  addProduct,
}
