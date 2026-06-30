import express from "express";
import pool from "../db.js";
import { upload } from "../config/cloudinary.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ======================
// PROFILE IMAGE UPLOAD
// ======================
router.put(
  "/profile-image",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const userId = req.user.id;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const imageUrl = req.file.path; // Cloudinary URL

      await pool.query(
        "UPDATE users SET image = $1 WHERE id = $2",
        [imageUrl, userId]
      );

      res.json({
        success: true,
        image: imageUrl,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

export default router;