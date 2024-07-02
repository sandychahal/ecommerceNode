// const {  } = require('../models/productsModel')
const {getAllProducts, getProductByCategory, addProduct, addReview } = require('../models/productsModel')


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


// assuming authentication has already been done 
const add = (req,res)=>{
  const name=req.body.name 
  const cat_id=req.body.cat_id 
  const desc=req.body.desc 
  const pfp=req.body.pfp 
  const cp=req.body.cp 
  const sp=req.body.sp 
  const mrp=req.body.mrp 
  const created_by=req.body.created_by
  const updated_by=req.body.updated_by

  console.log(name, cat_id, desc, cp, sp, mrp, created_by, updated_by);

  addProduct(req, name, cat_id, desc, pfp, cp, sp, mrp, created_by, updated_by, (err, products)=>{
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error adding products' , error: err})
    } else {
      res.json({ message: 'Product added successfully', result });
      // console.log(result);
    }
  })
  

}

// adding product review 
const reviewAdd=(req,res)=>{
  const p_id=req.body.p_id
  const u_id=req.body.u_id
  const review=req.body.review
  const created_by=req.body.created_by
  const updated_by=req.body.updated_by

  addReview(p_id,u_id, review, created_by, updated_by, (err,products)=>{
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error adding products review' })
      } else {
        res.json(products)
      }
  })

}

module.exports = {
  all,
  filter,
  add,
  reviewAdd,
}
