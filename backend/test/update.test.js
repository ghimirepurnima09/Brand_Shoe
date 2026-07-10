/**
 * update.test.js
 * ---------------------------------------------------------------------------
 * Route:      PUT /api/products/updateproduct/:id
 * Controller: updateProduct  (src/controllers/productController.js)
 * ---------------------------------------------------------------------------
 */

import { jest } from "@jest/globals";

// -----------------------------------------------------------------------
// STEP 1: Mock every dependency BEFORE importing the app
// -----------------------------------------------------------------------
jest.unstable_mockModule("../config/db.js", () => ({
  default: {
    query: jest.fn(),
  },
}));

jest.unstable_mockModule("multer", () => {
  const multerMock = () => ({
    single: () => (req, res, next) => next(),
    array: () => (req, res, next) => next(),
    fields: () => (req, res, next) => next(),
    none: () => (req, res, next) => next(),
  });
  multerMock.diskStorage = () => ({});
  multerMock.memoryStorage = () => ({});
  return { default: multerMock };
});

jest.unstable_mockModule("../socket.js", () => ({
  getIO: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    emit: jest.fn(),
  })),
}));

// -----------------------------------------------------------------------
// STEP 2: Import AFTER mocks are registered
// -----------------------------------------------------------------------
const request = (await import("supertest")).default;
const app = (await import("../app.js")).default;
const pool = (await import("../config/db.js")).default;

// -----------------------------------------------------------------------
// STEP 3: Standard suite hygiene
// -----------------------------------------------------------------------
describe("PUT /api/products/updateproduct/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const existingProduct = {
    id: 1,
    name: "Old Runner",
    category: "Sneakers",
    gender: "Men",
    price: 100,
    quantity: 20,
    size: "6,7,8,9,10,11",
    description: "Old description",
    image: "uploads/old.png",
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    sizes: "[]",
    is_most_sold: false,
    is_new: false,
    discount: 0,
    is_out_of_stock: false,
  };

  // -----------------------------------------------------------------
  test("1. should update a product successfully with valid data", async () => {
    // Arrange
    const updatedRow = { ...existingProduct, name: "New Runner", price: 150 };
    pool.query
      .mockResolvedValueOnce({ rows: [existingProduct] }) // SELECT existing
      .mockResolvedValueOnce({ rows: [updatedRow] });      // UPDATE ... RETURNING

    // Act
    const res = await request(app)
      .put("/api/products/updateproduct/1")
      .send({ name: "New Runner", price: 150 });

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Product Updated Successfully");
    expect(res.body.product).toEqual(updatedRow);
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  // -----------------------------------------------------------------
  test("2. should fall back to existing values when fields are omitted (missing fields)", async () => {
    // Arrange
    pool.query
      .mockResolvedValueOnce({ rows: [existingProduct] })
      .mockResolvedValueOnce({ rows: [existingProduct] });

    // Act
    const res = await request(app)
      .put("/api/products/updateproduct/1")
      .send({}); // no fields provided at all

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    const updateArgs = pool.query.mock.calls[1][1];
    expect(updateArgs[0]).toBe(existingProduct.name);   // fell back to existing name
    expect(updateArgs[7]).toBe(existingProduct.image);  // fell back to existing image
  });

  // -----------------------------------------------------------------
  test("3. should still return 200 when an invalid (non-numeric) discount string is supplied (invalid input)", async () => {
    // Arrange
    pool.query
      .mockResolvedValueOnce({ rows: [existingProduct] })
      .mockResolvedValueOnce({ rows: [{ ...existingProduct, discount: NaN }] });

    // Act
    const res = await request(app)
      .put("/api/products/updateproduct/1")
      .send({ discount: "not-a-number" });

    // Assert
    expect(res.statusCode).toBe(200);
    const updateArgs = pool.query.mock.calls[1][1];
    expect(Number.isNaN(updateArgs[15])).toBe(true); // parseInt("not-a-number") => NaN
  });

  // -----------------------------------------------------------------
  test("4. should return 404 when the product id does not exist (invalid ID)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: [] });

    // Act
    const res = await request(app)
      .put("/api/products/updateproduct/99999")
      .send({ name: "Ghost Shoe" });

    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Product Not Found");
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  // -----------------------------------------------------------------
  test("5. should return 404 when the product id does not exist (resource not found)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: [] });

    // Act
    const res = await request(app)
      .put("/api/products/updateproduct/abc123")
      .send({ name: "Whatever" });

    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Product Not Found");
  });

  // -----------------------------------------------------------------
  test("6. should return 500 when the update query violates a duplicate constraint", async () => {
    // Arrange
    pool.query
      .mockResolvedValueOnce({ rows: [existingProduct] })
      .mockRejectedValueOnce(Object.assign(new Error("duplicate key value"), { code: "23505" }));

    // Act
    const res = await request(app)
      .put("/api/products/updateproduct/1")
      .send({ name: "Duplicate Name" });

    // Assert
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server Error");
  });

  // -----------------------------------------------------------------
  test("7. should process the request without an Authorization header (route is public)", async () => {
    // Arrange
    pool.query
      .mockResolvedValueOnce({ rows: [existingProduct] })
      .mockResolvedValueOnce({ rows: [existingProduct] });

    // Act
    const res = await request(app)
      .put("/api/products/updateproduct/1")
      .send({ name: "Updated Without Auth" });

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // -----------------------------------------------------------------
  test("8. should return 500 when the initial SELECT query fails (database failure)", async () => {
    // Arrange
    pool.query.mockRejectedValueOnce(new Error("Connection terminated unexpectedly"));

    // Act
    const res = await request(app)
      .put("/api/products/updateproduct/1")
      .send({ name: "Whatever" });

    // Assert
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server Error");
  });

  // -----------------------------------------------------------------
  test("9. should return 500 when an unexpected internal exception occurs", async () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    pool.query.mockImplementationOnce(() => {
      throw new TypeError("Cannot read properties of undefined");
    });

    // Act
    const res = await request(app)
      .put("/api/products/updateproduct/1")
      .send({ name: "Whatever" });

    // Assert
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server Error");
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  // -----------------------------------------------------------------
  test("10. should preserve untouched image fields when only partially updated (edge case)", async () => {
    // Arrange
    const partialUpdateRow = { ...existingProduct, image2: "uploads/new-image2.png" };
    pool.query
      .mockResolvedValueOnce({ rows: [existingProduct] })
      .mockResolvedValueOnce({ rows: [partialUpdateRow] });

    // Act
    const res = await request(app)
      .put("/api/products/updateproduct/1")
      .send({ image2: "uploads/new-image2.png" });

    // Assert
    expect(res.statusCode).toBe(200);
    const updateArgs = pool.query.mock.calls[1][1];
    expect(updateArgs[8]).toBe("uploads/new-image2.png"); // image2 updated
    expect(updateArgs[9]).toBe(existingProduct.image3);   // image3 preserved
  });
});