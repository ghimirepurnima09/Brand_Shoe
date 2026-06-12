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

// Static routes first — before any /:id routes
router.post("/place",         placeOrder);
router.get("/myorders",       authMiddleware,  getUserOrders);
router.get("/all",            adminMiddleware, getAllOrders);

// Dynamic /:id routes after
router.put("/:id/status",     adminMiddleware, updateOrderStatus);
router.put("/:id/cancel",     authMiddleware,  cancelOrder);
router.delete("/:id",         adminMiddleware, deleteOrder);

export default router;