import express from "express";
import upload from "../middleware/upload.js";
import {
    addProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getMenProducts,
    getWomenProducts,
    getKidsProducts,
    getMostSoldProducts,
    getNewArrivalProducts,
    getOffersProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/addproduct",          upload.single("image"), addProduct);
router.put("/updateproduct/:id",    upload.single("image"), updateProduct);
router.get("/allproducts",          getProducts);
router.get("/getproducts",          getProducts);
router.get("/singleproduct/:id",    getSingleProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.get("/men",                  getMenProducts);
router.get("/women",                getWomenProducts);
router.get("/kids",                 getKidsProducts);
router.get("/mostsold",             getMostSoldProducts);
router.get("/newarrivals",          getNewArrivalProducts);
router.get("/offers",               getOffersProducts);

export default router;