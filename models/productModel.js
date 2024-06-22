import db from '../dbconfig';

export const getAllProducts = (req,res)=>{
    db.query("SELECT * FROM products",(err,rows)=>{
        if(err){
            res.status(500).send({message:"Error getting products"});
            }else{
                res.send(rows);
            }
    });
}
export const getProductsByCategoryId = (req,res)=>{
    const id = req.params.id;
    db.query("SELECT * FROM products WHERE cat_id = ?",[id],(err,rows)=>{
        if(err){
            res.status(500).send({message:"Error getting product"});
        }else{
            res.send(rows[0]);
        }
    });
};