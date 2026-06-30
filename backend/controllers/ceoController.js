import pool from "../config/db.js"; // ✅ correct

export const getCEO = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ceo ORDER BY id DESC LIMIT 1"
    );
    res.status(200).json({ success: true, data: result.rows[0] || null });
  } catch (error) {
    console.log("GET CEO ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadCEO = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const imageUrl = req.file.path; // Cloudinary full URL

    await pool.query("DELETE FROM ceo");

    const result = await pool.query(
      "INSERT INTO ceo (image) VALUES ($1) RETURNING *",
      [imageUrl]
    );

    res.status(201).json({ success: true, message: "CEO updated", data: result.rows[0] });
  } catch (error) {
    console.log("UPLOAD CEO ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};