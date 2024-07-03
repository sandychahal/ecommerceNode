const db = require('../config/database');
const multer = require('multer');
const path = require('path');


const getAllProducts = (callback) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return callback(err)
    }
    callback(null, results)
  })
}

const getProductByCategory = (id, callback) => {
  db.query('SELECT * FROM products WHERE cat_id = ?', [id], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

const storage=multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, path.join(__dirname, '../Images'));
  },
  filename: function(req,file,cb){
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


const upload=multer({storage})

const addProduct=(req,res, name, cat_id, desc, cp, sp, mrp, created_by, updated_by, callback)=>{
  if (!name || !cat_id || !desc || !cp || !sp || !mrp || !created_by || !updated_by) {
    return callback(new Error('All fields are required'));
  }
  upload.single('pfp')(req,res,(err)=>{
    if(err){
      return callback(err);
    }
    const file=req.file;
  if(!file)
    {
      return callback(new Error('No File Uploaded'));
    }
  const pfp=`/Images/${file.filename}`;
  const query =
    'INSERT INTO products (name,cat_id,`desc`,pfp,cp,sp,mrp, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  db.query(query, [name,cat_id,desc,pfp,cp,sp,mrp, created_by, updated_by], (err,result)=>{
    if(err){
      return callback(err);
    }
    callback(null, result);
  });

  });
};



const addReview=(p_id,u_id, review, created_by, updated_by, callback)=>{
  const query = 
  'INSERT INTO reviews (p_id, u_id, review, created_by, updated_by) VALUES (?,?,?,?,?)'
  db.query(query, [p_id,u_id, review, created_by, updated_by], (err, result)=>{
    if(err){
      return callback(err);
    }
    callback(null, result);
  });
};


module.exports = {
  getAllProducts,
  getProductByCategory,
  addProduct
}
