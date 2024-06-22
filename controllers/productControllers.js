import { getAllProducts, getProductsByCategoryId } from "../models/productModel";

export const getProducts = (req,res) => {
    try{
        const products = getAllProducts();
        res.json(products);
    }catch(err){
            res.status(500).json({message: err.message});
    }
}

export const getProductsByCategory = (req,res) => {
    try{
        const categoryId = req.params.categoryId;
        const products = getProductsByCategoryId(categoryId);
        res.json(products);
    }catch(err){
            res.status(500).json({message: err.message});
        }
}