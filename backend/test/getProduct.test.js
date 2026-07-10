/**
 * getProduct.test.js
 * ---------------------------------------------------------------------------
 * Route:      GET /api/products/allproducts
 * Controller: getProducts  (src/controllers/productController.js)
 *
 * NOTE: This route returns the full product list and takes no id, body,
 * or auth requirements. Several checklist items (missing fields, invalid
 * ID, duplicate data, unauthorized) do not literally apply to a plain
 * "get all" endpoint, so they are adapted below to the closest meaningful
 * equivalent for THIS controller, while still hitting exactly 10 cases.
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
describe("GET /api/products/allproducts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const sampleProducts = [
    { id: 2, name: "Trail Blazer", price: 90 },
    { id: 1, name: "Air Runner Max", price: 120 },
  ];

  // -----------------------------------------------------------------
  test("1. should return all products successfully", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: sampleProducts });

    // Act
    const res = await request(app).get("/api/products/allproducts");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.products).toEqual(sampleProducts);
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM products ORDER BY id DESC"
    );
  });

  // -----------------------------------------------------------------
  test("2. should ignore any request body sent with the GET request (no fields required)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: sampleProducts });

    // Act
    const res = await request(app)
      .get("/api/products/allproducts")
      .send({ unexpected: "field" });

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  // -----------------------------------------------------------------
  test("3. should ignore unrecognized query string parameters (invalid input)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: sampleProducts });

    // Act
    const res = await request(app).get(
      "/api/products/allproducts?sortBy=nonexistentColumn&page=-1"
    );

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.products).toEqual(sampleProducts);
  });

  // -----------------------------------------------------------------
  test("4. should return 404 for an unrelated nested path (no :id param on this route)", async () => {
    // Arrange
    // This route accepts no id segment; hitting a nested path should not
    // match the controller at all.
    // Act
    const res = await request(app).get("/api/products/allproducts/123");

    // Assert
    expect(res.statusCode).toBe(404);
  });

  // -----------------------------------------------------------------
  test("5. should return an empty array when no products exist (resource not found equivalent)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: [] });

    // Act
    const res = await request(app).get("/api/products/allproducts");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.products).toEqual([]);
  });

  // -----------------------------------------------------------------
  test("6. should return products even if duplicate names exist in the dataset (duplicate data)", async () => {
    // Arrange
    const duplicateNamedProducts = [
      { id: 1, name: "Air Runner Max" },
      { id: 5, name: "Air Runner Max" },
    ];
    pool.query.mockResolvedValueOnce({ rows: duplicateNamedProducts });

    // Act
    const res = await request(app).get("/api/products/allproducts");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.products).toHaveLength(2);
    expect(res.body.products[0].name).toBe(res.body.products[1].name);
  });

  // -----------------------------------------------------------------
  test("7. should return products without requiring an Authorization header (public route)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: sampleProducts });

    // Act
    const res = await request(app).get("/api/products/allproducts");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // -----------------------------------------------------------------
  test("8. should return 500 when the database query fails (database failure)", async () => {
    // Arrange
    pool.query.mockRejectedValueOnce(new Error("Connection terminated unexpectedly"));

    // Act
    const res = await request(app).get("/api/products/allproducts");

    // Assert
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server Error");
  });

  // -----------------------------------------------------------------
  test("9. should return 500 and log the error on an unexpected internal exception (server error)", async () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    pool.query.mockImplementationOnce(() => {
      throw new TypeError("Unexpected internal failure");
    });

    // Act
    const res = await request(app).get("/api/products/allproducts");

    // Assert
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server Error");
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  // -----------------------------------------------------------------
  test("10. should correctly return products containing null optional fields (edge case)", async () => {
    // Arrange
    const productsWithNulls = [
      { id: 1, name: "Minimal Shoe", image2: null, image3: null, discount: 0 },
    ];
    pool.query.mockResolvedValueOnce({ rows: productsWithNulls });

    // Act
    const res = await request(app).get("/api/products/allproducts");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.products[0].image2).toBeNull();
    expect(res.body.products[0].discount).toBe(0);
  });
});