import express from "express";
import { register, login, sendOTP, resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/register",      register);
router.post("/login",         login);
router.post("/sendotp",       sendOTP);
router.post("/resetpassword", resetPassword);

export default router;