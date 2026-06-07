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
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
} from "../controllers/adminController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// PUBLIC
router.post("/login", adminLogin);

// PROTECTED - Dashboard
router.get("/dashboard", adminMiddleware, getDashboardStats);

// PROTECTED - Users
router.get("/users",        adminMiddleware, getAllUsers);
router.delete("/users/:id", adminMiddleware, deleteUser);

// PROTECTED - Products
router.get("/products",        adminMiddleware, adminGetProducts);
router.post("/products",       adminMiddleware, upload.single("image"), adminAddProduct);
router.put("/products/:id",    adminMiddleware, upload.single("image"), adminUpdateProduct);
router.delete("/products/:id", adminMiddleware, adminDeleteProduct);

// PROTECTED - Orders
router.get("/orders",            adminMiddleware, getAllOrders);
router.put("/orders/:id/status", adminMiddleware, updateOrderStatus);
router.delete("/orders/:id",     adminMiddleware, deleteOrder);

export default router;