import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);
router.get("/test", (req, res) => {
    res.send("Payment Route Working");
});

export default router;