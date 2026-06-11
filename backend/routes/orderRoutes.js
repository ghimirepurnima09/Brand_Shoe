import express from "express";
import {
    placeOrder,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
    getUserOrders,
    cancelOrder,
} from "../controllers/orderController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/place",            placeOrder);
router.get("/all",               adminMiddleware, getAllOrders);
router.put("/:id/status",        adminMiddleware, updateOrderStatus);
router.delete("/:id",            adminMiddleware, deleteOrder);
router.get("/myorders",          authMiddleware, getUserOrders);
router.put("/:id/cancel",        authMiddleware, cancelOrder);

export default router;