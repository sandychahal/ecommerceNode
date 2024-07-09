// const {  } = require('../models/productsModel')
const express = require('express');
const router = express.Router();
const {addWarehouse, getAllWarehouse, updateWarehouse, deleteWarehouse } = require('../models/warehouseModel')




// adding product warehouse
const add=(req,res)=>{
  const w_name=req.body.w_name
  const address=req.body.address
  const city=req.body.city
  const state=req.body.state
  const zipcode=req.body.zipcode
  const country=req.body.country
  const mobile=req.body.mobile
  const manager=req.body.manager

    addWarehouse(w_name, address, city, state, zipcode, country, mobile, manager, (err,review)=>{
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error adding warehouse' })
        } else {
            res.json(review)
        }
    });

};



// getting all the warehouse
const all=(req,res)=>{
    getAllWarehouse((err, warehouses) => {
        if (err) {
          res.status(500).json({ message: 'Error fetching warehouses' })
        } else {
          res.json(warehouses)
        }
      });
};



const update = (req, res) => {
    const w_id = req.query.w_id
    const w_name = req.body.w_name
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state
    const zipcode = req.body.zipcode
    const country = req.body.country
    const mobile = req.body.mobile
    const manager = req.body.manager


    updateWarehouse(w_id, w_name, address, city, state, zipcode, country, mobile, manager, (err, updatedWarehouse) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating warehouse' })
      } else {
        res.json(updatedWarehouse)
      }
    });
  }



// deleting review 
const del=(req,res)=>{
    const w_id=req.query.w_id;
    console.log(w_id);
    deleteWarehouse(w_id, (err,review)=>{
          if (err) {
              console.log(err);
              res.status(500).json({ message: 'Error deleting warehouse' })
          } else {
              res.json(review)
          }
      });
  
  };


module.exports = {
  add,
  all,
  update,
  del
}
