import express from "express";
import {
    placeOrder,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
} from "../controllers/orderController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/place",     placeOrder);
router.get("/all",        adminMiddleware, getAllOrders);
router.put("/:id/status", adminMiddleware, updateOrderStatus);
router.delete("/:id",     adminMiddleware, deleteOrder);

export default router;