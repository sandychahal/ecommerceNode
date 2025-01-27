// const {  } = require('../models/productsModel')
const {addReview,getAllReview,deleteReview, updateReview } = require('../models/reviewModel')




// adding product review 
const add=(req,res)=>{
  const p_id=req.body.p_id
  const u_id=req.body.u_id
  const review=req.body.review
  const rating=req.body.rating
  const updated_by=req.body.updated_by

    addReview(p_id,u_id, review, rating, updated_by, (err,review)=>{
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error adding products review' })
        } else {
            res.json(review)
        }
    });

};

// getting all the review 
const all=(req,res)=>{
    getAllReview((err, review) => {
        if (err) {
          res.status(500).json({ message: 'Error fetching products' })
        } else {
          res.json(review)
        }
      })
}


// deleting review 
const del=(req,res)=>{
  const r_id=req.body.r_id;
  console.log(r_id);
  deleteReview(r_id, (err,review)=>{
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error deleting products review' })
        } else {
            res.json(review)
        }
    });

};



// updating review

const update = (req, res) => {
  const r_id = req.query.r_id
  const review = req.body.review
  const rating = req.body.rating
  const updated_by = req.body.updated_by

  updateReview(r_id, review, rating, updated_by, (err, review) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: 'Error updating products review' })
    } else {
      res.json(review)
    }
  })
}

module.exports = {
  add,
  all,
  del,
  update
}
