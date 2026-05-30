router.get("/men", async (req, res) => {
  const products = await db.query(
    "SELECT * FROM products WHERE category = 'Men'"
  );

  res.json({
    success: true,
    products: products.rows,
  });
});