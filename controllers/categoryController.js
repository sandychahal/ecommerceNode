const {
    getCategoryById,
    checkCategoryExists,
    createCategory,
    getAllCategories,
    addUpdatedCategory
  } = require('../models/categoryModel')
  
  const all = (req, res) => {
    getAllCategories((err, products) => {
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
    getCategoryById(id, (err, products) => {
      if (err) {
        res.status(500).json({ message: 'Error fetching products' })
      } else {
        res.json(products)
      }
    })
  }
  

  const addCategory = (req, res) => {
    const {
      name,
      parent,
      created_by,
      updated_by,
    } = req.body
  
    if (
      !name ||
      !parent ||
      !created_by ||
      !updated_by
    ) {
      return res.status(400).json({ error: 'All fields are required' })
    }
  
    checkCategoryExists(name, (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error checking existing category:', checkErr)
        return res.status(500).json({ error: 'Internal server error' })
      }
  
      if (checkResults.length > 0) {
        return res.status(400).json({ error: 'Category already exists' })
      }
  
      createCategory(
        name,
        parent,
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
  
  const updateCategory = (req,res) => {
    const { name, cat_id, desc, pfp, cp, sp, mrp,avg_ratings,avg_reviews,updated_by} = req.body;
    const id = req.params.id;
    if (!name || !cat_id || !desc || !pfp || !cp || !sp || !mrp || !avg_ratings || !avg_reviews || !updated_by){
      return res.status(400).json({ error: 'All fields are required' })
    }
    checkCategoryExists(id, (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error checking existing product:', checkErr)
        return res.status(500).json({ error: 'Internal server error' })
      }
      addUpdatedCategory(
        id,
        name,
        cat_id,
        desc,
        pfp,
        cp,
        sp,
        mrp,
        avg_ratings,
        avg_reviews,
        updated_by,
        (insertErr, insertResults) => {
          if (insertErr) {
            console.error('Error inserting user:', insertErr)
            return res.status(500).json({ error: 'Internal server error' })
          }
  
          return res.status(201).json({
            p_id: id,
            name,
            cat_id,
            desc,
            pfp,
            cp,
            sp,
            mrp,
            avg_ratings,
            avg_reviews,
            updated_by,
          })
  })
  })}
  
  module.exports = {
    all,
    filter,
    addCategory,
    updateCategory
  }
  