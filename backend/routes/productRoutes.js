import express from "express";

import {

    addProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    getMenProducts

} from "../controllers/productController.js";

const router = express.Router();


// ADD PRODUCT

router.post("/addproduct", addProduct);


// GET ALL PRODUCTS

router.get("/getproducts", getProducts);


// GET SINGLE PRODUCT

router.get("/singleproduct/:id", getSingleProduct);


// UPDATE PRODUCT

router.put("/updateproduct/:id", updateProduct);


// DELETE PRODUCT

router.delete("/deleteproduct/:id", deleteProduct);

// MEN PRODUCTS

router.get("/men", getMenProducts);



export default router;