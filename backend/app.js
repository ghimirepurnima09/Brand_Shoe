import express from "express";
import cors from "cors";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import ceoRoutes from "./routes/ceoRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// process.cwd() is the folder you run node/npm from — always backend/
// for this project — so it points at the same place __dirname would.
const __dirname = process.cwd();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/ceo", ceoRoutes);
app.use("/api/upload", uploadRoutes);

export default app;