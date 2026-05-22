require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

function handleError(res, err) {
  console.error(err);
  return res.status(500).json({ error: err.message || "Internal server error" });
}

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    return handleError(res, err);
  }
});

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    return handleError(res, err);
  }
});

app.post("/products", async (req, res) => {
  try {

    const {
      name,
      brand,
      price,
      image,
      description
    } = req.body;

    const newProduct = await pool.query(
      `INSERT INTO products
      (name, brand, price, image, description)
      VALUES($1,$2,$3,$4,$5)
      RETURNING *`,
      [name, brand, price, image, description]
    );

    res.json(newProduct.rows[0]);

  } catch (err) {
    return handleError(res, err);
  }
});

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});