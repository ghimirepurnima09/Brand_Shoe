import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve image folders
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/men", express.static(path.join(__dirname, "public/men")));
app.use("/women", express.static(path.join(__dirname, "public/women")));
app.use("/kids", express.static(path.join(__dirname, "public/kids")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server Running On ${process.env.PORT}`);
});