import express from "express";
import multer from "multer";
import path from "path";
import { getCEO, uploadCEO } from "../controllers/ceoController.js";

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// routes
router.get("/ceo", getCEO);
router.post("/upload-ceo", upload.single("image"), uploadCEO);

export default router;