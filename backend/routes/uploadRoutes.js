import express from "express";
import pool from "../config/db.js";
import { upload } from "../config/cloudinary.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put(
  "/profile-image",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("✅ Upload route hit");
      console.log("👤 req.user:", req.user);
      console.log("📁 req.file:", req.file);

      const userId = req.user?.id;

      if (!userId) {
        console.log("❌ No user id found in token");
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      if (!req.file) {
        console.log("❌ No file received");
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      const imageUrl = req.file.path;
      console.log("🖼️ Cloudinary URL:", imageUrl);

      const result = await pool.query(
        "UPDATE users SET image = $1 WHERE id = $2 RETURNING id, name, image",
        [imageUrl, userId]
      );

      console.log("💾 DB result:", result.rows);

      if (result.rows.length === 0) {
        console.log("❌ No user found with id:", userId);
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({ success: true, imageUrl: imageUrl });

    } catch (err) {
      console.log("❌ UPLOAD ERROR:", err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

export default router;