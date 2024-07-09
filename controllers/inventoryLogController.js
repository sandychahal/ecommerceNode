// const {  } = require('../models/productsModel')
const express = require('express');
const router = express.Router();
const {addInventoryLog, getAllInventoryLog, updateInventoryLog, deleteInventoryLog} = require('../models/inventoryLogModel');




// adding product warehouse
const add=(req,res)=>{
  const w_id=req.body.w_id
  const p_id=req.body.p_id
  const quantity=req.body.quantity
  const in_qty=req.body.in_qty
  const out_qty=req.body.out_qty
  const created_by=req.body.created_by
  const updated_by=req.body.updated_by

    addInventoryLog(w_id, p_id, quantity,in_qty, out_qty, created_by, updated_by, (err,review)=>{
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error adding inventory log' })
        } else {
            res.json(review)
        }
    });

};



// getting all the warehouse
const all=(req,res)=>{
    getAllInventoryLog((err, inventory_log) => {
        if (err) {
          res.status(500).json({ message: 'Error fetching inventory logs' })
        } else {
          res.json(inventory_log)
        }
      });
};



const update = (req, res) => {
    const il_id = req.query.il_id;
    const w_id = req.body.w_id
    const p_id = req.body.p_id
    const quantity = req.body.quantity
    const in_qty=req.body.in_qty
    const out_qty=req.body.out_qty
    const updated_by = req.body.updated_by


    updateInventoryLog(il_id, w_id, p_id, quantity, in_qty, out_qty, updated_by, (err, updatedInventoryLog) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating inventory log' })
      } else {
        res.json(updatedInventoryLog)
      }
    });
};



// deleting inventory 
const del=(req,res)=>{
    const il_id=req.query.il_id;
    // console.log(w_id);
    deleteInventoryLog(il_id, (err,inventory_log)=>{
          if (err) {
              console.log(err);
              res.status(500).json({ message: 'Error deleting inventory log' })
          } else {
              res.json(inventory_log)
          }
      });
  
};


module.exports = {
  add,
  all,
  update,
  del
}
