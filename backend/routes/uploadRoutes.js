import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload-ceo", upload.single("image"), (req, res) => {
  res.json({
    success: true,
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

export default router;