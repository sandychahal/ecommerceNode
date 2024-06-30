// const {  } = require('../models/productsModel')
const {getAllProducts, getProductByCategory, addProduct } = require('../models/productsModel')


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
  // const p_id=req.body.id
  const name=req.body.name 
  const cat_id=req.body.cat_id 
  const desc=req.body.desc 
  const pfp=req.body.pfp 
  const cp=req.body.cp 
  const sp=req.body.sp 
  const mrp=req.body.mrp 
  const created_by=req.body.created_by
  const updated_by=req.body.updated_by
  // const w_name=req.body.w_name 
  // const address=req.body.address
  // const city=req.body.city
  // const state=req.body.state
  // const zipcode=req.body.zipcode
  // const country=req.body.country
  // const quantity=req.body.quantity
  // const mobile=req.body.mobile
  // const manager=req.body.manager

  addProduct(name, cat_id, desc, pfp, cp, sp, mrp, created_by, updated_by, (err, products)=>{
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error adding products' })
    } else {
      res.json(products)
    }
  })
  

}

module.exports = {
  all,
  filter,
  add,
}
