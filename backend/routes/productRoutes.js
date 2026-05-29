import express from "express";

import {
    addProduct
} from "../controllers/productController.js";

const router = express.Router();


// ADD PRODUCT

router.post("/addproduct", addProduct);


export default router;