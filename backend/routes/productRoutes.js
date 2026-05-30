import express from "express";

import {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getMenProducts,
  getWomenProducts,
  getKidsProducts
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


// WOMEN PRODUCTS

router.get("/women", getWomenProducts);

// KIDS PRODUCTS

router.get("/kids", getKidsProducts);

export default router;