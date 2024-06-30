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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images'); // store images in .Images folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // generate a unique filename
  }
});

const upload = multer({ storage: storage });

const addProduct=( name, cat_id, desc, cp, sp, mrp, created_by, updated_by, callback)=>{
  upload.single('pfp');
  const query1 =
    'INSERT INTO products (name,cat_id,`desc`,pfp,cp,sp,mrp, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const req=this.req;
    req.body.pfp=req.file.filename;
  db.query(query1, [name,cat_id,desc,req.body.pfp,cp,sp,mrp, created_by, updated_by], (err,result)=>{
    if(err){
      return callback(err);
    }
    // const p_id=result.insertId;
    // const query2=
    // 'INSERT INTO warehouses (p_id, w_name, address, city, state, zipcode, country, quantity, mobile, manager) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    // db.query(query2, [p_id,w_name,address,city,state,zipcode,country, quantity, mobile, manager], (err, result)=>{
    //   if(err){
    //     return callback(err);
    //   }
      callback(null, result);
    // });
  });
};

module.exports = {
  getAllProducts,
  getProductByCategory,
  addProduct,
}
