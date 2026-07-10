jest.mock("../config/db.js", () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));
// Bypass multer/cloudinary — not relevant to controller logic being tested
jest.mock("../middleware/upload.js", () => ({
  __esModule: true,
  default: { single: () => (req, res, next) => next() },
}));

const request = require("supertest");
const app = require("../app.js").default;
const pool = require("../config/db.js").default;

describe("POST /api/products/addproduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validBody = {
    name: "Air Max 90",
    category: "Sneakers",
    gender: "Men",
    price: 120,
    quantity: 10,
    description: "A classic sneaker",
    image: "nike-air-max-90.png",
  };

  test("1. should return 201 and the created product on success", async () => {
    const insertedRow = { id: 1, ...validBody };
    pool.query.mockResolvedValueOnce({ rows: [insertedRow] });

    const res = await request(app).post("/api/products/addproduct").send(validBody);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Product Added Successfully");
    expect(res.body.product).toEqual(insertedRow);
  });

  test("2. should return 400 if name is missing", async () => {
    const { name, ...body } = validBody;
    const res = await request(app).post("/api/products/addproduct").send(body);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Please fill all fields including image");
  });

  test("3. should return 400 if image is missing", async () => {
    const { image, ...body } = validBody;
    const res = await request(app).post("/api/products/addproduct").send(body);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("4. should default size to '6,7,8,9,10,11' when not provided", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    await request(app).post("/api/products/addproduct").send(validBody);

    const params = pool.query.mock.calls[0][1];
    expect(params[5]).toBe("6,7,8,9,10,11");
  });

  test("5. should default sizes (JSON list) to '[]' when not provided", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    await request(app).post("/api/products/addproduct").send(validBody);

    const params = pool.query.mock.calls[0][1];
    expect(params[12]).toBe("[]");
  });

  test("6. should convert is_most_sold string 'true' into boolean true", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    await request(app)
      .post("/api/products/addproduct")
      .send({ ...validBody, is_most_sold: "true" });

    const params = pool.query.mock.calls[0][1];
    expect(params[13]).toBe(true);
  });

  test("7. should default discount to 0 when not provided", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    await request(app).post("/api/products/addproduct").send(validBody);

    const params = pool.query.mock.calls[0][1];
    expect(params[15]).toBe(0);
  });

  test("8. should return 500 if the insert query fails", async () => {
    pool.query.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app).post("/api/products/addproduct").send(validBody);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Server Error");
  });

  test("9. should use the body image field when no uploaded file is present", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    await request(app).post("/api/products/addproduct").send(validBody);

    const params = pool.query.mock.calls[0][1];
    expect(params[7]).toBe(validBody.image);
  });

  test("10. should pass price and quantity through to the insert unchanged", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    await request(app).post("/api/products/addproduct").send(validBody);

    const params = pool.query.mock.calls[0][1];
    expect(params[3]).toBe(validBody.price);
    expect(params[4]).toBe(validBody.quantity);
  });
});
