import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Brand_Shoe Backend Running");
});

app.listen(process.env.PORT, () => {

    console.log(`Server Running On ${process.env.PORT}`);

});