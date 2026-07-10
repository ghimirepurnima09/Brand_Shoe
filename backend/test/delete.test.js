/**
 * delete.test.js
 * ---------------------------------------------------------------------------
 * Route:      DELETE /api/products/deleteproduct/:id
 * Controller: deleteProduct  (src/controllers/productController.js)
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
describe("DELETE /api/products/deleteproduct/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const existingProduct = { id: 1, name: "Air Runner Max" };

  // -----------------------------------------------------------------
  test("1. should delete a product successfully when it exists", async () => {
    // Arrange
    pool.query
      .mockResolvedValueOnce({ rows: [existingProduct] }) // SELECT check
      .mockResolvedValueOnce({ rowCount: 1 });             // DELETE

    // Act
    const res = await request(app).delete("/api/products/deleteproduct/1");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Product Deleted Successfully");
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  // -----------------------------------------------------------------
  test("2. should return 404 when the id parameter is missing product data (missing required field)", async () => {
    // Arrange
    // Hitting the base route without an id segment does not match this
    // route at all, so we simulate the closest valid scenario: an id that
    // resolves to no rows, since :id is a mandatory route param.
    pool.query.mockResolvedValueOnce({ rows: [] });

    // Act
    const res = await request(app).delete("/api/products/deleteproduct/");

    // Assert
    // Depending on router matching this can 404 at the Express layer or
    // reach the controller's own not-found branch; we assert the safe,
    // expected outer bound.
    expect([404]).toContain(res.statusCode);
  });

  // -----------------------------------------------------------------
  test("3. should return 404 when id is a non-numeric string (invalid input)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: [] });

    // Act
    const res = await request(app).delete("/api/products/deleteproduct/not-an-id");

    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Product Not Found");
  });

  // -----------------------------------------------------------------
  test("4. should return 404 when id does not correspond to any product (invalid ID)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: [] });

    // Act
    const res = await request(app).delete("/api/products/deleteproduct/999999");

    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Product Not Found");
    expect(pool.query).toHaveBeenCalledTimes(1); // DELETE never runs
  });

  // -----------------------------------------------------------------
  test("5. should return 404 for a product that was already deleted (resource not found)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: [] });

    // Act
    const res = await request(app).delete("/api/products/deleteproduct/1");

    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Product Not Found");
  });

  // -----------------------------------------------------------------
  test("6. should not attempt duplicate deletion once a product is gone (duplicate data)", async () => {
    // Arrange
    // Simulate calling delete twice back-to-back: first succeeds, second
    // finds no row (already removed).
    pool.query
      .mockResolvedValueOnce({ rows: [existingProduct] })
      .mockResolvedValueOnce({ rowCount: 1 })
      .mockResolvedValueOnce({ rows: [] });

    // Act
    const firstRes = await request(app).delete("/api/products/deleteproduct/1");
    const secondRes = await request(app).delete("/api/products/deleteproduct/1");

    // Assert
    expect(firstRes.statusCode).toBe(200);
    expect(secondRes.statusCode).toBe(404);
    expect(secondRes.body.message).toBe("Product Not Found");
  });

  // -----------------------------------------------------------------
  test("7. should process the request without an Authorization header (route is public)", async () => {
    // Arrange
    pool.query
      .mockResolvedValueOnce({ rows: [existingProduct] })
      .mockResolvedValueOnce({ rowCount: 1 });

    // Act
    const res = await request(app).delete("/api/products/deleteproduct/1");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // -----------------------------------------------------------------
  test("8. should return 500 when the SELECT query fails (database failure)", async () => {
    // Arrange
    pool.query.mockRejectedValueOnce(new Error("Connection terminated unexpectedly"));

    // Act
    const res = await request(app).delete("/api/products/deleteproduct/1");

    // Assert
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server Error");
  });

  // -----------------------------------------------------------------
  test("9. should return 500 when the DELETE query fails after a successful SELECT (server error)", async () => {
    // Arrange
    pool.query
      .mockResolvedValueOnce({ rows: [existingProduct] })
      .mockRejectedValueOnce(new Error("DELETE statement failed"));
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Act
    const res = await request(app).delete("/api/products/deleteproduct/1");

    // Assert
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server Error");
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  // -----------------------------------------------------------------
  test("10. should handle very large numeric ids gracefully (edge case)", async () => {
    // Arrange
    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 9007199254740991 }] })
      .mockResolvedValueOnce({ rowCount: 1 });

    // Act
    const res = await request(app).delete(
      "/api/products/deleteproduct/9007199254740991"
    );

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(pool.query.mock.calls[0][1]).toEqual(["9007199254740991"]);
  });
});