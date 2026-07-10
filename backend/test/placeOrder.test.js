import { jest } from "@jest/globals";

jest.unstable_mockModule("../config/db.js", () => ({
  default: { query: jest.fn() },
}));

jest.unstable_mockModule("bcryptjs", () => ({
  default: { hash: jest.fn(), compare: jest.fn() },
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: { sign: jest.fn(), verify: jest.fn() },
}));

jest.unstable_mockModule("nodemailer", () => ({
  default: {
    createTransport: jest.fn(() => ({
      sendMail: jest.fn().mockResolvedValue(true),
    })),
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

const request = (await import("supertest")).default;
const app = (await import("../app.js")).default;
const pool = (await import("../config/db.js")).default;

describe("POST /api/orders/place", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const validBody = {
    user_id: 1,
    user_name: "Purnima",
    user_email: "purnima@example.com",
    address: "Kathmandu",
    city: "Kathmandu",
    state: "Bagmati",
    zip: "44600",
    items: [{ productId: 1, qty: 2 }],
    subtotal: 240,
    shipping: 10,
    tax: 5,
    total: 255,
    payment: "card",
  };

  test("1. should return 201 and the created order on success", async () => {
    const insertedOrder = { id: 1, ...validBody, status: "pending" };
    pool.query.mockResolvedValueOnce({ rows: [insertedOrder] });

    const res = await request(app).post("/api/orders/place").send(validBody);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Order placed!");
    expect(res.body.order).toEqual(insertedOrder);
  });

  test("2. should return 400 if user_name is missing", async () => {
    const { user_name, ...body } = validBody;
    const res = await request(app).post("/api/orders/place").send(body);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Missing required fields");
  });

  test("3. should return 400 if address, items, or total is missing", async () => {
    const { total, ...body } = validBody;
    const res = await request(app).post("/api/orders/place").send(body);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("4. should default city/state/zip to empty strings when not provided", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
    const { city, state, zip, ...body } = validBody;

    await request(app).post("/api/orders/place").send(body);

    const params = pool.query.mock.calls[0][1];
    expect(params[4]).toBe("");
    expect(params[5]).toBe("");
    expect(params[6]).toBe("");
  });

  test("5. should serialize the items array as a JSON string", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    await request(app).post("/api/orders/place").send(validBody);

    const params = pool.query.mock.calls[0][1];
    expect(params[7]).toBe(JSON.stringify(validBody.items));
  });

  test("6. should return 500 if the insert query fails", async () => {
    pool.query.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app).post("/api/orders/place").send(validBody);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Server Error");
  });

  test("7. should default payment to 'cod' when not provided", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
    const { payment, ...body } = validBody;

    await request(app).post("/api/orders/place").send(body);

    const params = pool.query.mock.calls[0][1];
    expect(params[12]).toBe("cod");
  });

  test("8. should default user_id to null when not provided", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
    const { user_id, ...body } = validBody;

    await request(app).post("/api/orders/place").send(body);

    const params = pool.query.mock.calls[0][1];
    expect(params[0]).toBeNull();
  });

  test("9. should insert the order with status 'pending'", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    await request(app).post("/api/orders/place").send(validBody);

    const sqlText = pool.query.mock.calls[0][0];
    expect(sqlText).toContain("'pending'");
  });

  test("10. should pass subtotal and total through to the insert unchanged", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    await request(app).post("/api/orders/place").send(validBody);

    const params = pool.query.mock.calls[0][1];
    expect(params[8]).toBe(validBody.subtotal);
    expect(params[11]).toBe(validBody.total);
  });
});