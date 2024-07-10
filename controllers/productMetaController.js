const { createProductMeta, getAllProductMeta, getUniqueProductMeta } = require('../models/ProductMetaModel')

const all = (req, res) => {
  getAllProductMeta((err, products) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching products' })
    } else {
      res.json(products)
    }
  })
}

const filter = (req, res) => {
  const id = req.params.id 
  getUniqueProductMeta(id, (err, products) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching products' })
    } else {
      res.json(products)
    }
  })
}


const addProductMeta = (req, res) => {
  const { p_id, m_key, m_value, created_by, updated_by} = req.body

  if (!p_id || !m_key || !m_value || !created_by || !updated_by) {
    return res.status(400).json({ error: 'All fields are required' })
  }

    createProductMeta(
        p_id, m_key, m_value, created_by, updated_by,
        (insertErr, insertResults) => {
        if (insertErr) {
          console.error('Error inserting user:', insertErr)
          return res.status(500).json({ error: 'Internal server error' })
        }

        return res.status(201).json({
          id: insertResults.insertId,
          p_id,
          m_key,
          m_value,
        })
      }
    )
}

const updateProductMeta = (req,res) => {
  const { p_id, m_key, m_value, updated_by} = req.body;
  const id = req.params.id;
  if (!p_id || !m_key || !m_value || !updated_by){
    return res.status(400).json({ error: 'All fields are required' })
  }
  checkProductMetaExists(id, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking existing ProductMeta:', checkErr)
      return res.status(500).json({ error: 'Internal server error' })
    }
    addUpdatedProductMeta(
      id,
      p_id,
      m_key,
      m_value,
      updated_by,
      (insertErr, insertResults) => {
        if (insertErr) {
          console.error('Error inserting ProductMeta:', insertErr)
          return res.status(500).json({ error: 'Internal server error' })
        }

        return res.status(201).json({
          a_id: id,
          p_id,
          m_key,
          m_value,
          updated_by,
        })
})
})}


module.exports = {
  all,
  filter,
  addProductMeta,
  updateProductMeta,
}
