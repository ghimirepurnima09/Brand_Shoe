router.get("/kids", async (req, res) => {
  try {
    const products = await db.query(
      "SELECT * FROM products WHERE category = 'Kids'"
    );

    res.json({
      success: true,
      products: products.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});