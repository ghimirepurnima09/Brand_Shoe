import express from "express";
import { getCEO, uploadCEO } from "../controllers/ceoController.js"; // ✅
import { upload } from "../config/cloudinary.js";                    // ✅

const router = express.Router();

router.get("/ceo", getCEO);
router.post("/upload-ceo", upload.single("image"), uploadCEO);

export default router;