// const {  } = require('../models/productsModel')
const express = require('express');
const router = express.Router();
const {addInventory, getAllInventory, updateInventory, deleteInventory} = require('../models/inventoryModel');




// adding product warehouse
const add=(req,res)=>{
  const w_id=req.body.w_id
  const p_id=req.body.p_id
  const quantity=req.body.quantity
  const created_by=req.body.created_by
  const updated_by=req.body.updated_by

    addInventory(w_id, p_id, quantity, created_by, updated_by, (err,review)=>{
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error adding inventory' })
        } else {
            res.json(review)
        }
    });

};



// getting all the warehouse
const all=(req,res)=>{
    getAllInventory((err, warehouses) => {
        if (err) {
          res.status(500).json({ message: 'Error fetching inventory' })
        } else {
          res.json(warehouses)
        }
      });
};



const update = (req, res) => {
    const i_id = req.query.i_id;
    const w_id = req.body.w_id
    const p_id = req.body.p_id
    const quantity = req.body.quantity
    const updated_by = req.body.updated_by


    updateInventory(i_id, w_id, p_id, quantity, updated_by, (err, updatedInventory) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating inventory' })
      } else {
        res.json(updatedInventory)
      }
    });
  }



// deleting inventory 
const del=(req,res)=>{
    const i_id=req.query.i_id;
    // console.log(w_id);
    deleteInventory(i_id, (err,inventory)=>{
          if (err) {
              console.log(err);
              res.status(500).json({ message: 'Error deleting inventory' })
          } else {
              res.json(inventory)
          }
      });
  
};


module.exports = {
  add,
  all,
  update,
  del
}
