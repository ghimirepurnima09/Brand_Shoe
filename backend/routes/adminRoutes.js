import express from "express";

import {
  adminLogin,
  getDashboardStats,
  getAllUsers,
  deleteUser,
  adminGetProducts,
  adminAddProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} from "../controllers/adminController.js";

import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// PUBLIC
router.post("/login", adminLogin);

// PROTECTED
router.get("/dashboard", adminMiddleware, getDashboardStats);

router.get("/users", adminMiddleware, getAllUsers);
router.delete("/users/:id", adminMiddleware, deleteUser);

router.get("/products", adminMiddleware, adminGetProducts);
router.post("/products", adminMiddleware, adminAddProduct);
router.put("/products/:id", adminMiddleware, adminUpdateProduct);
router.delete("/products/:id", adminMiddleware, adminDeleteProduct);

export default router;