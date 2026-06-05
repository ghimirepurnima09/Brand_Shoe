import express from "express";
import upload from "../middleware/multer.js";
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

// ADD PRODUCT — with image upload
router.post("/addproduct", upload.single("image"), addProduct);

// GET ALL PRODUCTS
router.get("/getproducts", getProducts);

// GET SINGLE PRODUCT
router.get("/singleproduct/:id", getSingleProduct);

// UPDATE PRODUCT — with optional image upload
router.put("/updateproduct/:id", upload.single("image"), updateProduct);

// DELETE PRODUCT
router.delete("/deleteproduct/:id", deleteProduct);

// MEN PRODUCTS
router.get("/men", getMenProducts);

// WOMEN PRODUCTS
router.get("/women", getWomenProducts);

// KIDS PRODUCTS
router.get("/kids", getKidsProducts);

export default router;