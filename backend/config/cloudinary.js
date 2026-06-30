import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// ======================
// CLOUDINARY CONFIG
// ======================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ======================
// STORAGE CONFIG
// ======================
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "brand_shoe",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],

    public_id: (req, file) =>
      Date.now() + "-" + file.originalname.split(".")[0],
  },
});

// ======================
// MULTER UPLOAD
// ======================
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default cloudinary;