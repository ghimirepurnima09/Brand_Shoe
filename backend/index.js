import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import ceoRoutes from "./routes/ceoRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import { setIO } from "./socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

// ================= Socket.IO =================
const io = new Server(httpServer, {
  cors: {
    origin: [
      "https://localhost:5173",
      "https://localhost:5174",
    ],
    methods: ["GET", "POST"],
  },
});

setIO(io);

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("join_user_room", (userId) => {
    if (userId) {
      socket.join(`user_${userId}`);
      console.log(`👤 User ${userId} joined room`);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= Static Files =================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ================= Routes =================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/ceo", ceoRoutes);
app.use("/api/upload", uploadRoutes);

// ================= Start Server =================
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server Running On Port ${PORT}`);
  });
}

// Export for Jest testing
export default app;