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
import orderRoutes from "./routes/orderRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images from public/uploads
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// Routes
app.use("/api/auth",     authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment",  paymentRoutes);
app.use("/api/admin",    adminRoutes);
app.use("/api/orders",   orderRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server Running On Port ${process.env.PORT}`);
});